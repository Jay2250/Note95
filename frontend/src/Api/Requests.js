import makeRequest from "./makeRequest";

export class Requests {
    static async login(payload) {
        return await makeRequest('/auth/login', "post", payload);
    }

    static async register(payload) {
        return await makeRequest('/auth/register', "post", payload);
    }

    static async getAllNotes() {
        return await makeRequest('/note', "get");
    }

    static async getNoteById(id) {
        return await makeRequest(`/note/${id}`, "get");
    }

    static async updateNote(id, payload) {
        return await makeRequest(`/note/${id}`, "PATCH", payload);
    }

    static async deleteNote(id) {
        return await makeRequest(`/note/${id}`, "delete");
    }

    static async createNote(payload) {
        return await makeRequest('/note', 'post', payload);
    }

    static async filterNotes(tag) {
        return await makeRequest(`/note/filter/${tag}`, 'get');
    }
}