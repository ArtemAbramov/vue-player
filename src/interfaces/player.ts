export interface ITrack {
    id: number
    src: string
    meta: {
        title: string
        artist: string
        album: string
        year: string
        img: string
        imgBig: string
        duration?: string
    }
}