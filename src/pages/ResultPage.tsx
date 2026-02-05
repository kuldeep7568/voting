import "./result.css";

/**
 * Public folder assets:
 * - Video: `public/video.mp4` -> `/video.mp4`
 * - PDF:   `public/doc.pdf`   -> `/doc.pdf`
 *
 * To change paths, edit `VIDEO_SRC` / `PDF_SRC` below.
 */
const VIDEO_SRC = "/video1.mp4";
const PDF_SRC = "/pic2.jpeg";

export default function ResultPage() {
  return (
    <div className="result-page">
      <div className="result-container">
        <header className="result-header">
          {/* <h1 className="result-title">मतदान माहिती</h1> */}
          {/* <div className="result-subtitle">Video first, PDF below</div> */}
        </header>

        <section className="result-videoSection" aria-label="Video">
          <video
            className="result-video"
            controls
            autoPlay
            playsInline
            src={VIDEO_SRC}
          />
        </section>

        <section className="result-pdfSection" aria-label="PDF">
          <div className="result-pdfFrameWrap">
            <img className="result-pdfFrame" src={PDF_SRC} title="PDF" />
          </div>
          {/* <div className="result-pdfFallback">
            <a
              className="result-link"
              href={PDF_SRC}
              target="_blank"
              rel="noreferrer"
            >
              Download PDF
            </a>
          </div> */}
        </section>
      </div>
    </div>
  );
}
