import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

    static get(index: string) {
        return localStorage.getItem(index);
    }

    static getAll() {
        return { ...localStorage };
    }

    static set(index: string, value: any) {
        return localStorage.setItem(index, (typeof value === 'object') ? JSON.stringify(value) : value);
    }

    static getObject(index: string) {
        return JSON.parse(this.get(index));
    }
}