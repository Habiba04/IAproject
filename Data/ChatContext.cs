using System;
using System.Collections.Generic;
using ChatApi.DTO;
using ChatApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ChatApi.Data;

public partial class ChatContext : DbContext
{
    public ChatContext()
    {
    }

    public ChatContext(DbContextOptions<ChatContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Message> Messages { get; set; }
    public DbSet<MessageDTO> MessageDTOs { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=HABIBA;Database=Chat;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Message>(entity =>
        {
            entity.HasKey(e => e.id).HasName("PK__messages__3213E83FF053D8F9");

            entity.ToTable("messages");

            entity.Property(e => e.id).HasColumnName("id");
            entity.Property(e => e.content)
                .HasMaxLength(400)
                .IsUnicode(false)
                .HasColumnName("content");
            entity.Property(e => e.recieverID)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("recieverId");
            entity.Property(e => e.recieverName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("recieverName");
            entity.Property(e => e.senderID)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("senderId");
            entity.Property(e => e.senderName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("senderName");
        });

        modelBuilder.Entity<GetChatListDTO>().HasNoKey();
        modelBuilder.Entity<MessageDTO>().HasNoKey();
        OnModelCreatingPartial(modelBuilder);

    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    // Method to execute the function
    public async Task<List<GetChatListDTO>> GetChatListAsync(string recieverID)
    {
        var result = await this.Set<GetChatListDTO>()
            .FromSqlInterpolated($"SELECT * FROM GetDistinctSenders({recieverID})")
            .ToListAsync();

        return result;
    }

    public async Task<List<MessageDTO>> GetMessagesAsync(string recieverID, string senderID)
    {
        return await MessageDTOs
            .FromSqlInterpolated($"SELECT * FROM GetMessages({recieverID}, {senderID})")
            .ToListAsync();
    }



}
