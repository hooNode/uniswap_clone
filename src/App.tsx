import styled from "@emotion/styled";
import ErrorBoundary from "@shared/components/ErrorBoundary";
import ErrorComponent from "@shared/components/ErrorComponent";
import Header from "@shared/components/Header";
import BigNumber from "bignumber.js";
import NotFound from "pages/NotFound";
import Swap from "pages/Swap";
import { Navigate, Route, Routes } from "react-router-dom";

window.Buffer = window.Buffer || require("buffer").Buffer;

BigNumber.config({
  EXPONENTIAL_AT: 59,
  DECIMAL_PLACES: 18,
  FORMAT: { decimalSeparator: ".", groupSeparator: ",", groupSize: 3 },
});

export default function App() {
  return (
    <ErrorBoundary fallback={<ErrorComponent />}>
      <Styles.Header>
        <Header />
      </Styles.Header>
      <Styles.Main>
        <Routes>
          <Route path="/" element={<Navigate to="/swap" replace />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
          <Route path="/not-found" element={<NotFound />} />
        </Routes>
      </Styles.Main>
    </ErrorBoundary>
  );
}

const Styles = {
  Header: styled.header`
    display: flex;
    align-items: center;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;

    z-index: ${({ theme }) => theme.zIndex.header};
  `,
  Main: styled.main`
    --height-header: ${({ theme }) => theme.height.header};
    margin-top: var(--height-header);
    height: calc(100vh - var(--height-header));
  `,
  Footer: styled.footer``,
};
