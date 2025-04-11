using ChatApi.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ChatApi.Data;
using ChatApi.DTO;

namespace ChatApi.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class MessagesController : ControllerBase
{
    private readonly ChatContext _context;

    public MessagesController(ChatContext context)
    {
        _context = context;
    }

    // GET: api/messages/distinct-senders/201
    // TODO => convert to GUID
    [HttpGet("distinct-senders/{recieverID}")]
    public async Task<ActionResult<List<GetChatListDTO>>> GetDistinctSenders(string recieverID)
    {
        var senders = await _context.GetChatListAsync(recieverID);
        return Ok(senders);
    }

    [HttpGet("conversation")]
    public async Task<IActionResult> GetConversation([FromQuery] string senderID, [FromQuery] string recieverID)
    {
        var messages = await _context.GetMessagesAsync(recieverID, senderID);
        return Ok(messages);
    }
}
