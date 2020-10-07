export interface ICurrentTrack {
    id: number
    src: string
    meta: {
        title: string
        artist: string
        album: string
        year: string
        img: string
    }
}