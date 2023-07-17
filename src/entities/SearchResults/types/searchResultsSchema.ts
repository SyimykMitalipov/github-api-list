export interface ISearchParams {
    q: string | null,
    per_page?: string | null,
    page?: string | null,
}



export interface IRepo {
    html_url: string,
    name: string,
    owner: IOwner,
    forks: number,
    watchers: number,
    id: number,

}


export interface IOwner {
    login: string,
    avatar_url: string,
    html_url: string,
    id: number,

}

export interface ISearchResults {
    searchStatus: string, 
    searchRepoResults: {
        total_count: number,
        items: IRepo[],
    },
    searchError: string | null,
}