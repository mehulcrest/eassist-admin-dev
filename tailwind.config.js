/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        textColor: "#333333",
        secondaryTextColor: "#667085",
        navheaderColor: "#1D2939",
        whiteColor: "#ffffff",
        DangerRed: "#D92D20",

        gradientFrom: "#FD544F",
        gradientVia: "#F33F3E",
        gradientTo: "#EA312E",

        pageColor: "#F9FAFB",
        lineMuted: "#ebebeb",
        line: "#E4E7EC",
        muted: "#8b8f99",
        icon: "#7a7f88",

        inputLabel: "#1E1E1E",
        inputBorder: "#E9EAEB",
        inputPlaceholder: "#A4A4A4",

        tableHeader: "#F4EEEE",

        greenVerified: "#039855",
        orangeReview: "#DC6803",
        redRejected: "#F04438",
      },

      width: {
        sidebar: "290px",
        logo: "45px",
      },

      height: {
        navbar: "43px",
      },

      fontSize: {
        caption: ["10px", { lineHeight: "14px" }],
        label: ["11px", { lineHeight: "16px" }],
        brandTitle: ["26px", { lineHeight: "28px" }],
      },

      letterSpacing: {
        section: "0.08em",
      },

      spacing: {
        "2.25": "9px",
      },

      screens: {
        xxs: "600px",
        xs: "640.98px",
        sm: "768.98px",
        md: "991.98px",
        lg: "1024.98px",
        xl: "1440.98px",
        xxl: "1560.98px",
        xxxl: "1920.98px",
      },

      fontWeight: {
        extralight: "200",
      },

      borderRadius: {
        large: "12px",
        10: "10px",
      },

      boxShadow: {
        custom: "0px 2px 6px -4.27px #0000000D",
        1: "0px 3px 6px 0px rgb(0 0 0 / 20%)",
        2: "0px 4px 30px rgba(0, 0, 0, 0.2)",
        3: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
      },
    },

    container: {
      center: true,
    },
  },
  plugins: [],
};
