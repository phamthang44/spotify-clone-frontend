import api from "../services/axiosClient.js";

export const playlists = api.get(`/playlists/me`)

export const albums = api.get(`/albums`)

export const artists = api.get(`/artists`)

export const songs = api.get(`/songs`)