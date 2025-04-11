namespace ChatApi.DTO
{
    public class GetChatListDTO
    {
        public string senderID { get; set; }
        public string senderName { get; set; }

    }

    public class MessageDTO
    {
        public int id { get; set; }
        public string senderID { get; set; }
        public string recieverID { get; set; }
        public string senderName { get; set; }
        public string recieverName { get; set; }
        public string content { get; set; }
    }
}
