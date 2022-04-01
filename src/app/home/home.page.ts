import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../spotify.service';
import {NavController} from '@ionic/angular';
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

export class HomePage{
  public tracks: any[];
  artistsName: any[] = [];

  constructor(
    private spotify: SpotifyService,
    private navCtrl: NavController
  ) {}

  async getArtistName(artistName: any) {
    this.spotify.getArtistLists(artistName.target.value).subscribe( data => {
      this.artistsName = data;
      console.log(this.artistsName);
    });
  }

  // クリックした要素のIdをgetArtistAlbumWithTracksの引数に渡す
  public async clickArtistName(artistId: string) {
      this.navCtrl.navigateForward(['artist-songs', artistId]);
  }
}
