import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Volitan Labs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const title =
    locale === "tr"
      ? "Makine Mühendisliği Öğrencisi & Mobil Uygulama Geliştirici"
      : "Mechanical Engineering Student & Mobile App Developer";

  const subtitle =
    locale === "tr"
      ? "Flutter ile mobil deneyimler • Mühendislik hassasiyetiyle"
      : "Mobile experiences with Flutter • Engineering precision";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0A0A0F 0%, #141419 50%, #0A0A0F 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #00C8F0, #9B7BF0)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #00C8F0, #9B7BF0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            V
          </div>
          <span
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#F0F0F5",
            }}
          >
            Volitan Labs
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "52px",
            fontWeight: 700,
            color: "#F0F0F5",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          Muhammed Eren Gökceoğlu
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "28px",
            color: "#00C8F0",
            margin: "16px 0 0 0",
            fontWeight: 500,
          }}
        >
          {title}
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: "20px",
            color: "#8A8A9A",
            margin: "16px 0 0 0",
          }}
        >
          {subtitle}
        </p>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "18px", color: "#5A5A6A" }}>
            volitanlabs.dev
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
