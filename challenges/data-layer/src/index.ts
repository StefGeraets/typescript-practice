export interface DataEntity {
  id: string;
}
export interface Movie extends DataEntity {
  director: string;
}
export interface Song extends DataEntity {
  singer: string;
}

export interface Comic extends DataEntity {
  issue: number;
}

export type DataEntityMap = {
  movie: Movie;
  song: Song;
  // comic: Comic;
};

type DataStoreMethods = {
  [K in keyof DataEntityMap as `getAll${Capitalize<K>}s`]: () => DataEntityMap[K][];
} & {
  [K in keyof DataEntityMap as `get${Capitalize<K>}`]: (
    id: string
  ) => DataEntityMap[K];
} & {
  [K in keyof DataEntityMap as `add${Capitalize<K>}`]: (
    arg: DataEntityMap[K]
  ) => DataEntityMap[K];
} & {
  [K in keyof DataEntityMap as `clear${Capitalize<K>}s`]: () => void;
};

function isDefined<T>(x: T | undefined): x is T {
  return typeof x !== "undefined";
}

export class DataStore implements DataStoreMethods {
  #data: { [K in keyof DataEntityMap]: Record<string, DataEntityMap[K]> } = {
    movie: {},
    song: {},
  };

  getAllSongs(): Song[] {
    return Object.keys(this.#data.song)
      .map((songKey) => this.#data.song[songKey]!)
      .filter(isDefined);
  }
  getSong(id: string): Song {
    const song = this.#data.song[id];
    if (!song) throw new Error(`Could not find song with id ${id}`);
    return song;
  }
  addSong(s: Song): Song {
    this.#data.song[s.id] = s;
    return s;
  }
  clearSongs(): void {
    this.#data.song = {};
  }

  getAllMovies(): Movie[] {
    return Object.keys(this.#data.movie)
      .map((movieKey) => this.#data.movie[movieKey]!)
      .filter(isDefined);
  }
  getMovie(id: string): Movie {
    const movie = this.#data.movie[id];
    if (!movie) throw new Error(`Could not find song with id ${id}`);
    return movie;
  }
  addMovie(m: Movie): Movie {
    this.#data.movie[m.id] = m;
    return m;
  }
  clearMovies(): void {
    this.#data.movie = {};
  }
}
