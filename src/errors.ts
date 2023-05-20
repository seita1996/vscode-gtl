export class GlobalError extends Error {
    constructor(readonly name: string, message: string) {
        super(message);
    }
}

export class GitLabTokenNotSet extends GlobalError {
    constructor() {
        super('GitLabTokenNotSet', 'No GitLab token set, visit options.');
    }
}

export class GitLabUrlNotSet extends GlobalError {
    constructor() {
        super('GitLabUrlNotSet', 'No GitLab host url set, visit options.');
    }
}

export class FailFetchSettings extends GlobalError {
    constructor() {
        super('FailFetchSettings', 'Fail fetching settings.');
    }
}