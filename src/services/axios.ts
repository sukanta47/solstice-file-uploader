import axios from 'axios'; 

const instance = axios.create({
  baseURL: import.meta.env.VITE_SUPABASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use((config)=>{
    console.log("interceptor req", config);
    const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY!;
    const sessionObj = localStorage.getItem("session");
    const accessToken = sessionObj ? JSON.parse(sessionObj).access_token : null;
    if (config.headers) {
        config.headers['apikey'] = SUPABASE_ANON_KEY;
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
    }
    return config;
},(error)=>{
    return Promise.reject(error);
})

instance.interceptors.response.use((response)=>{
    return response;
}, async(error)=>{
    console.log("interceptor error", error);
    const originalRequest = error.config;
    if(error?.response?.status === 401) {
        const refreshToken = localStorage.getItem("session") ? JSON.parse(localStorage.getItem("session")!).refresh_token : null;
        if(refreshToken && !originalRequest._retry) {
            try {
            const response = await axios.post(`${import.meta.env.VITE_SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
                    refresh_token: refreshToken
                },{
                    headers: {
                        'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY!,
                        'Content-Type': 'application/json',
                    }
                });

            const newToken = response.data.response.accessToken;
            localStorage.setItem(
                "accessToken",
                JSON.stringify(response.data.response.accessToken)
            );
            
            localStorage.setItem(
                "refreshToken",
                JSON.stringify(response.data.response.refreshToken)
            );
            originalRequest._retry = true;
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return instance(originalRequest);
            } catch (error) {
            localStorage.clear();
            window.location.href = '/login';
            }
        }
    }
    return Promise.reject(error);
    
})

export default instance;