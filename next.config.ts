import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Anciennes adresses « kits » : chaque site a désormais son espace /sites/<slug>.
  async redirects() {
    return [
      { source: "/kits", destination: "/sites", permanent: true },
      { source: "/kits/:slug", destination: "/sites/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
