import { Injectable } from '@angular/core';
import { HttpService } from './http';
import { UserStore } from '../stores/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly ROOT_URL: string = '/api/users';
  constructor(
    private httpService: HttpService,
    private readonly userStore: UserStore
  ) {}

  public async getAllUsers(): Promise<any> {
    try {
      const response = await this.httpService.get(`${this.ROOT_URL}`);

      if (response.error) {
        return response.error;
      }

      // Update user store:
      this.userStore.updateUsers(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    } finally {
      // Log some stuff if needed:
    }
  }

  public async createNewUser(user: unknown): Promise<any> {
    try {
      const response = await this.httpService.post(
        `${this.ROOT_URL}/create`,
        user
      );

      // Refetch users and update the user store:
      await this.getAllUsers();
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
      }
    } finally {
      // Log some stuff if needed:
    }
  }
}
