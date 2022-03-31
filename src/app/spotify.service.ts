import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  baseUrl = 'https://api.spotify.com/v1';
  constructor(private http: HttpClient) { }

  getArtistAlbums(artistId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/artists/${artistId}/albums`, { params: { include_groups: 'album,single' } });
  }

  getAlbumTracks(albumId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/albums/${albumId}/tracks`);
  }

  getArtistAlbumWithTracks(artistId: string): Observable<any>{
    return this.getArtistAlbums(artistId).pipe(
      tap( data => console.log(data)),
      map(albums => albums.items),
      tap( data => console.log(data)),
      mergeMap(albums => forkJoin(
          albums.map(album => this.getAlbumTracks(album.id).pipe(map(tracks => tracks.items)))
        )
      ),
      map((tracks: any[][]) => tracks.reduce((acc, curr) => [...acc, ...curr], []))
    );
  }

  getArtist(artistName: string): Observable<any>{
    return this.http.get(`${this.baseUrl}/search`, { params: { q: `artist:${artistName}`, type: `artist`} })
      .pipe(
        //tap( data => console.log(data.artists)),
        map(data => data.items)
      );
  }
}
