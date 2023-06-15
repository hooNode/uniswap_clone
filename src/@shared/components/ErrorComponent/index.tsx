import styled from "@emotion/styled";

export default function ErrorComponent() {
  return <Styles.Wrapper>예기치 못한 오류가 발생했습니다.</Styles.Wrapper>;
}

const Styles = {
  Wrapper: styled.section`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};
