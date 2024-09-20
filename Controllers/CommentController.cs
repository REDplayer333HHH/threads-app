using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using threads_app.Data;
using threads_app.Models;

namespace threads_app.Controllers
{
    [Route("/thread/comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly Database database;
        public CommentController(Database _database)
        {
            database = _database;
        }

        [HttpGet("/getbythreadid/{threadId}")]
        public async Task<IActionResult> GetByThreadId(int threadId){
            var commentList = await database.CommentTable.ToListAsync();
            commentList.Select(comment => {
                if(comment.Id == threadId){
                    return comment;
                }
                return null;
            });
            if(commentList == null){
                return NotFound();
            }
            return Ok(commentList);
        }

        [HttpGet("{commentId}")]
        public async Task<IActionResult> GetById(int commentId){
            var comment = await database.CommentTable.FindAsync(commentId);
            if(comment == null){
                return NotFound();
            }
            return Ok(comment);
        }

        [HttpPost("{threadId}")]
        public async Task<IActionResult> Create(int threadId, [FromBody] CommentNoId commentNoId){
            // if(!await database.CommentTable.AnyAsync(thread => thread.Id == threadId)){
            //     return BadRequest("Thread does not exist");
            // }
            var commentToPost = commentNoId.ToComment();
            commentToPost.ThreadId = threadId;
            await database.CommentTable.AddAsync(commentToPost);
            await database.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = commentToPost.Id }, commentToPost);
        }
    }
}
