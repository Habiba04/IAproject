
using ChatApi.Data;
using Microsoft.EntityFrameworkCore;
using ChatApi.Hubs;
using Microsoft.Extensions.Options;

namespace ChatApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("myPolicy", policy =>
                {
                    policy.WithOrigins("http://localhost:5173") // Only allow frontend origin
                          .AllowAnyMethod()
                          .AllowAnyHeader()
                          .AllowCredentials(); // ?? This is key when using SignalR
                });
            });

            builder.Services.AddSignalR();

            // Add services to the container.

            builder.Services.AddDbContext<ChatContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();
            app.UseCors("myPolicy");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.MapHub<ChatHub>("/hubs/chat");

            app.Run();
        }
    }
}
