
export class Movie {
    constructor(
      public id: string,
      public title: string,
      public director: string,
      public releaseYear: number,
      public genre: string,
      public ratings: number[] = []
    ) {}
  }
  

  
  export class MovieDatabase {
    private movies: Movie[] = [];
  
    addMovie(id: string, title: string, director: string, releaseYear: number, genre: string): void {
      if (this.movies.some(movie => movie.id === id)) {
        console.log(`Movie with ID ${id} already exists.`);
        return;
      }
      this.movies.push(new Movie(id, title, director, releaseYear, genre));
    }
  
    rateMovie(id: string, rating: number): void {
      const movie = this.movies.find(movie => movie.id === id);
      if (!movie) {
        console.log("Movie not found.");
        return;
      }
      if (rating < 1 || rating > 5) {
        console.log("Rating must be between 1 and 5.");
        return;
      }
      movie.ratings.push(rating);
    }
  
    getAverageRating(id: string): number | undefined {
      const movie = this.movies.find(movie => movie.id === id);
      if (!movie || movie.ratings.length === 0) return undefined;
      const total = movie.ratings.reduce((sum, rate) => sum + rate, 0);
      return total / movie.ratings.length;
    }
  
    getTopRatedMovies(): Movie[] {
      return [...this.movies].sort((a, b) => (this.getAverageRating(b.id) || 0) - (this.getAverageRating(a.id) || 0));
    }
  
    getMoviesByGenre(genre: string): Movie[] {
      return this.movies.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
    }
  
    getMoviesByDirector(director: string): Movie[] {
      return this.movies.filter(movie => movie.director.toLowerCase() === director.toLowerCase());
    }
  
    searchMoviesBasedOnKeyword(keyword: string): Movie[] {
      return this.movies.filter(movie => movie.title.toLowerCase().includes(keyword.toLowerCase()));
    }
  
    getMovie(id: string): Movie | undefined {
      return this.movies.find(movie => movie.id === id);
    }
  
    removeMovie(id: string): void {
      const index = this.movies.findIndex(movie => movie.id === id);
      if (index !== -1) {
        this.movies.splice(index, 1);
        console.log("Movie removed successfully.");
      } else {
        console.log("Movie not found.");
      }
    }
  }