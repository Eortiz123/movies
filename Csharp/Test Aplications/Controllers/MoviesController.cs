using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Test_Aplications.Data;
using Test_Aplications.Models;

namespace Test_Aplications.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : Controller
    {
        private readonly AppDbContext appDbContext;

        public MoviesController(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        //Method POST
        [HttpPost]
        public async Task<ActionResult<List<Movie>>> AddMovie(Movie movie) { 
            if(movie != null)
            {
                appDbContext.Movies.Add(movie);
                await appDbContext.SaveChangesAsync();
                return Ok(await appDbContext.Movies.ToListAsync());
            }
            
            return BadRequest("Se produjo un error: instancia de objeto no establecida. Asegúrate de inicializar el objeto antes de utilizarlo.");
        }

        //Method GET All
        [HttpGet]
        public async Task<ActionResult<List<Movie>>> getAllMovies() {
            var movies = await appDbContext.Movies.ToListAsync();
            return Ok(movies);
        }

        //Method GET Only
        [HttpGet("{id:int}")]
        public async Task<ActionResult<List<Movie>>> getAllMovies(int id)
        {
            var movie = await appDbContext.Movies.FirstOrDefaultAsync(e => e.Id == id);
            if (movie != null) { 
                return Ok(movie);
            }
            return BadRequest("Película no encontrada");
        }

        //Method PUT
        [HttpPut]
        public async Task<ActionResult<List<Movie>>> putMovies(Movie movie)
        {
            if (movie != null)
            {
                var update_movie = await appDbContext.Movies.FirstOrDefaultAsync(e => e.Id == movie.Id);
                update_movie!.Titulo = movie.Titulo;
                update_movie.Direccion = movie.Direccion;
                update_movie.Produccion = movie.Produccion;
                update_movie.Fotografo = movie.Fotografo;
                update_movie.Vestuario = movie.Vestuario;
                update_movie.Resena = movie.Resena;
                update_movie.Pais = movie.Pais;
                update_movie.Duracion = movie.Duracion;
                update_movie.FechaEstreno = movie.FechaEstreno;
                update_movie.UpdatedAt = DateTime.Now;
                await appDbContext.SaveChangesAsync();
                return Ok(update_movie);
            }
            return BadRequest("Película no encontrada");
        }

        //Method DELETE Only
        [HttpDelete]
        public async Task<ActionResult<List<Movie>>> deleteMovie(int id)
        {
            var movie = await appDbContext.Movies.FirstOrDefaultAsync(e => e.Id == id);
            if (movie != null)
            {
                appDbContext.Movies.Remove(movie);
                await appDbContext.SaveChangesAsync();
                return Ok(await appDbContext.Movies.ToListAsync());
            }
            return NotFound();
        }

    }
}
