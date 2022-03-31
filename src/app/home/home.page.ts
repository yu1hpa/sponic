import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../spotify.service';
export interface ArtistAlbum {
  href: string;
  items?: (ItemsEntity)[] | null;
  limit: number;
  next: string;
  offset: number;
  previous?: null;
  total: number;
}
export interface ItemsEntity {
  albumGroup: string;
  albumType: string;
  artists?: (ArtistsEntity)[] | null;
  availableMarkets?: (string)[] | null;
  externalUrls: ExternalUrls;
  href: string;
  id: string;
  images?: (ImagesEntity)[] | null;
  name: string;
  releaseDate: string;
  releaseDatePrecision: string;
  totalTracks: number;
  type: string;
  uri: string;
}
export interface ArtistsEntity {
  externalUrls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
export interface ExternalUrls {
  spotify: string;
}
export interface ImagesEntity {
  height: number;
  url: string;
  width: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{
  tracks: any[];

  constructor(private spotify: SpotifyService) {}

  ngOnInit() {

    this.spotify.getArtistAlbumWithTracks('57dN52uHvrHOxijzpIgu3E').subscribe(data => {
      console.log(data);
      this.tracks = data;
    });
  }
}
