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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id){
            var comment = await database.CommentTable.FindAsync(id);
            if(comment == null){
                return NotFound();
            }
            return Ok(comment);
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> Create(int id, [FromBody] CommentNoId commentNoId){
            var commentToPost = commentNoId.ToComment();
            commentToPost.ThreadId = id;
            await database.CommentTable.AddAsync(commentToPost);
            await database.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = commentToPost.Id }, commentToPost);
        }
    }
}
