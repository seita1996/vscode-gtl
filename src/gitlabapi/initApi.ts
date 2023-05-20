// import { Gitlab } from '@gitbeaker/browser';
import { GitlabSettings } from '../types';
import { FailFetchSettings, GitLabUrlNotSet, GitLabTokenNotSet } from '../errors';
import fetch from 'cross-fetch';

class GitlabApi {
    public readonly url: string;
    public readonly headers: { [header: string]: string };
    public readonly requestTimeout: number;
    constructor({
        host = 'https://gitlab.com',
        token = '',
        prefixUrl = '',
        requestTimeout = 10000
    }) {
        this.url = [host, 'api', 'v4', prefixUrl].join('/');
        this.headers = {};
        this.headers['private-token'] = token;
        this.requestTimeout = requestTimeout;
    }

    public async todos() {
        const res: any = await fetch(`${this.url}/todos`, {
            method: 'GET',
            headers: this.headers
        });
        return await res.json();
    }
}

export const initApi = (settings: GitlabSettings): any => {
    if (!settings) {
        throw new FailFetchSettings();
    }

    if (!settings.token) {
        throw new GitLabTokenNotSet();
    }

    if (!settings.host) {
        throw new GitLabUrlNotSet();
    }

    return new GitlabApi({
        host: settings.host,
        token: settings.token
    });
};
