import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Profile} from '../interfaces/profile.interface';
import {map, Observable, tap} from 'rxjs';
import {Pageble} from '../interfaces/pageble.interface';


@Injectable({
  providedIn: `root`
})
export class ProfileService {
  http = inject(HttpClient)
  baseApiUrl = 'https://icherniakov.ru/yt-course/'

  me = signal<Profile | null>(null)
  filteredProfiles = signal<Profile[]>([])

  getMe(): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`)
      .pipe(
        tap(res => this.me.set(res))
      )
  }

  getTestAccounts(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`)
  }

  getAccount(id: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseApiUrl}account/${id}`)
  }

  public getSubscribersShortList(subsAmount = 3): Observable<Profile[]> {
    return this.http.get<Pageble<Profile>>(`${this.baseApiUrl}account/subscribers/`)
      .pipe(
        map(res => res.items.slice(0, subsAmount))
      )
  }

  patchProfile(profile: Partial<Profile>): Observable<Profile> {
    return this.http.patch<Profile>(
      `${this.baseApiUrl}account/me`,
      profile)
  }

  uploadAvatar(file: File): Observable<Profile> {
    const fd = new FormData();
    fd.append('image', file);
    return this.http.post<Profile>(
      `${this.baseApiUrl}account/upload_image`,
      fd)
  }

  filterProfiles(params: Record<string, any>): Observable<Pageble<Profile>> {
    return this.http.get<Pageble<Profile>>(`${this.baseApiUrl}account/accounts`,
      {
        params
      }
    ).pipe(
      tap(res => this.filteredProfiles.set(res.items))
    )
  }
}
