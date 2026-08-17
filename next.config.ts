import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const repo = 'ajay-choudhary-chemistry';

const nextConfig: NextConfig = {
  output: isGithubActions ? 'export' : undefined,
  basePath: isGithubActions ? `/${repo}` : '',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubActions ? `/${repo}` : '',
  }
};

export default nextConfig;
