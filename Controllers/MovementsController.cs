using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MStarTest.Data;
using MStarTest.Models;

namespace MStarTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovementsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MovementsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Moviments
        [HttpGet("{type}")]
        public async Task<ActionResult<IEnumerable<Movement>>> GetMoviments(int type)
        {
            var moviments = await _context.Moviments
                .Where(m => m.Type == type)
                .Include(m => m.Stock)
                .Include(m => m.Product)
                .Select(m => new Movement
                {
                    Id = m.Id,
                    TypeText = m.Type == 0 ? "Entrada" : "Saída",
                    MovimentedAt = m.MovimentedAt,
                    StockName = m.Stock!.Name,
                    ProductName = m.Product!.Name,
                    ProductId = m.ProductId,
                    StockId = m.StockId,
                    Quantity = m.Quantity,
                })
                .ToListAsync();

            if (moviments == null)
            {
                return NotFound();
            }
            return moviments;
        }

        // GET: api/Moviments/5
        [HttpGet("{type}/{id}")]
        public async Task<ActionResult<Movement>> GetMoviment(int type, int id)
        {
            if (_context.Moviments == null)
            {
                return NotFound();
            }
            var moviment = await _context.Moviments.FindAsync(id);

            if (moviment == null)
            {
                return NotFound();
            }

            return moviment;
        }

        // PUT: api/Moviments/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMoviment(int id, Movement moviment)
        {
            if (id != moviment.Id)
            {
                return BadRequest();
            }

            moviment.UpdatedAt = DateTime.UtcNow;
            _context.Entry(moviment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovimentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Moviments
        [HttpPost]
        public async Task<ActionResult<Movement>> PostMoviment(Movement moviment)
        {
            if (_context.Moviments == null)
            {
                return Problem("Entity set 'AppDbContext.Moviments'  is null.");
            }
            _context.Moviments.Add(moviment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMoviment", new { id = moviment.Id }, moviment);
        }

        // DELETE: api/Moviments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMoviment(int id)
        {
            if (_context.Moviments == null)
            {
                return NotFound();
            }
            var moviment = await _context.Moviments.FindAsync(id);
            if (moviment == null)
            {
                return NotFound();
            }

            _context.Moviments.Remove(moviment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MovimentExists(int id)
        {
            return (_context.Moviments?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
