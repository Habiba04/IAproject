using ChatApi.Data;
using ChatApi.Models;
using Microsoft.AspNetCore.SignalR;
using ChatApi.DTO;

namespace ChatApi.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ChatContext _context;
        private static readonly Dictionary<string, string> UserConnections = new();

        public ChatHub(ChatContext context)
        {
            _context = context;
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            if (httpContext == null)
            {
                await base.OnConnectedAsync();
                return;
            }

            var senderID = httpContext.Request.Query["senderID"].ToString();
            var recieverID = httpContext.Request.Query["recieverID"].ToString();

            if (string.IsNullOrWhiteSpace(senderID) || string.IsNullOrWhiteSpace(recieverID))
            {
                await Clients.Caller.SendAsync("Error", "Missing sender or receiver ID.");
                return;
            }

            // Save the user's connection ID
            UserConnections[senderID] = Context.ConnectionId;
            foreach (var connection in UserConnections.Values) { 
                Console.WriteLine(connection.ToString());
            }

            try
            {
                var messages = await _context.GetMessagesAsync(senderID, recieverID);
                

                // Send chat history to the connected client
                await Clients.Caller.SendAsync("ReceiveHistory", messages);
            }
            catch (Exception ex)
            {
                await Clients.Caller.SendAsync("Error", $"Failed to load messages: {ex.Message}");
            }

            await base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            // Optional cleanup if needed
            var userId = UserConnections.FirstOrDefault(x => x.Value == Context.ConnectionId).Key;
            if (!string.IsNullOrEmpty(userId))
            {
                UserConnections.Remove(userId);
            }

            return base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(string senderID, string recieverID, string content, string recieverName, string senderName )
        {
            Console.WriteLine($"Sender ID: {senderID}, Receiver ID: {recieverID}, Content: {content}");
            var message = new Message
            {
                senderID = senderID,
                recieverID = recieverID,
                content = content,
                senderName = senderName,
                recieverName = recieverName
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
            Console.WriteLine($"Message saved: {message.id}");
            if (UserConnections.TryGetValue(recieverID, out var connId))
            {
                await Clients.Client(connId).SendAsync("ReceiveMessage", message);
            }

            if (UserConnections.TryGetValue(senderID, out var senderConnId))
            {
                await Clients.Client(senderConnId).SendAsync("ReceiveMessage", message);
            }
            Console.WriteLine($"Message sent to: {recieverID}");
        }

    }
}
