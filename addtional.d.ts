// We will be able to remove this file once https://github.com/sebholstein/astro-google-fonts-optimizer/pull/6 is merged and new version is published
declare module "astro-google-fonts-optimizer" {
  type Props = {
    url: string | string[];
  };
  export const GoogleFontsOptimizer: (props: Props) => any;
}
