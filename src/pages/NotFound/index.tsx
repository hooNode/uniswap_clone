import styled from "@emotion/styled";

export default function NotFound() {
  return (
    <Styles.PageWrapper>
      <Styles.Title>404</Styles.Title>
      <Styles.SubTitle>Page not found!</Styles.SubTitle>
      <Styles.Image src={"/images/404-page-light.png"} alt="Liluni" />
      <Styles.Description>Oops, take me back to Swap</Styles.Description>
    </Styles.PageWrapper>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Styles = {
  PageWrapper: styled(Container)`
    flex: 1;
    justify-content: center;
    gap: 50px;
  `,
  Title: styled.span``,
  SubTitle: styled.span``,
  Description: styled.span``,
  Image: styled.img`
    max-width: 510px;
    width: 100%;
    padding: 0 75px;
  `,
};
