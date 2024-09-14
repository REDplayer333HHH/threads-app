using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using threads_app.Data;
using threads_app.Dtos;
using threads_app.Models;

namespace threads_app.Controllers
{
    [Route("/thread")]
    [ApiController]
    public class ThreadController: ControllerBase
    {
        private readonly Database database;
        public ThreadController(Database _database)
        {
            database = _database;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var threads = await database.ThreadTable.ToListAsync();
            return Ok(threads);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var thread = await database.ThreadTable.FindAsync(id);
            if (thread == null){
                return NotFound();
            }
            return Ok(thread);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ThreadNoId threadNoId)
        {
            var threadToPost = threadNoId.ToThread();
            await database.ThreadTable.AddAsync(threadToPost);
            await database.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = threadToPost.Id}, threadToPost);
        }
    }
}
