export interface Game{
  id: Number;
  name: String;
  genre: String;
  cover_image: String;
  achievements: Achievement[];
}

export interface GamePage{
  content: Game[];
  pageable: {
    sort: {
      empty: Boolean,
      sorted: Boolean,
      unsorted: Boolean
    },
    offset: Number,
    pageSize: Number,
    pageNumber: Number,
    unpaged: Boolean,
    paged: Boolean
  },
  last: Boolean,
  totalElements: Number,
  totalPages: Number,
  size: Number,
  number: Number,
  sort: {
    empty: Boolean,
    sorted: Boolean,
    unsorted: Boolean
  },
  first: Boolean,
  numberOfElements: Number,
  empty: Boolean
}


export interface Achievement{
  id: String;
  name: String;
  description: String;
  picture: String;
}
