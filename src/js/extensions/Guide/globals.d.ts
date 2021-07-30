declare module '@ryusei/code' {
  interface Options {
    /**
     * Options for the Guide component.
     */
    guide?: boolean | GuideOptions,
  }

  interface GuideOptions {
  }

  interface Extensions {
    Guide: Guide;
  }
}
