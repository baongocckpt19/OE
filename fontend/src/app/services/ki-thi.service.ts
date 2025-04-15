import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

interface Examination {
    id: number;
    title: string;
    description: string;
    createdBy: string;
    createdDate: string; // Or Date, depending on your backend
    // Add other properties to match your backend Examination entity
}

@Injectable({
    providedIn: 'root'
})
export class KiThiService {
    private apiUrl = 'http://localhost:8080/api/examinations'; // Adjust the URL if your backend runs on a different port

    constructor(private http: HttpClient) { }

    getKithis(): Observable<Examination[]> {
        return this.http.get<Examination[]>(this.apiUrl);
    }
}