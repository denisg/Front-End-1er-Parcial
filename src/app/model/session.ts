export function isSessionActive():boolean{
    return localStorage.getItem('session') === 'active';
}

