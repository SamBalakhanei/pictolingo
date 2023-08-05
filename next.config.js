/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        serverActionsBodySizeLimit: '100mb'
    },
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'i.ibb.co'
            }
        ]
    }
    
}

module.exports = nextConfig
