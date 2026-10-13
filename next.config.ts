import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sans base de données, les pages lisent les dossiers sites/ : on les embarque dans le déploiement.
  outputFileTracingIncludes: {
    "/**": ["./sites/**/*"],
  },
  // Anciennes adresses « kits » : chaque site a désormais son espace /sites/<slug>.
  async redirects() {
    return [
      { source: "/kits", destination: "/sites", permanent: true },
      { source: "/kits/:slug", destination: "/sites/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
