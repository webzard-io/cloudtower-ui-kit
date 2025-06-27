import { css } from "@linaria/core";
import { styled } from "@linaria/react";

export const KubeConfigModalStyle = css`
  .ant-modal-body {
    padding: 60px 128px;
  }
`;
export const KubeConfigWrapperStyle = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
export const KubeConfigTitleStyle = css`
  color: $gray-120;
  font-size: 32px !important;
  margin-bottom: 16px;
`;
export const KubeConfigTipStyle = css`
  margin-bottom: 32px;
  color: $gray-120;
`;
export const KubeConfigContentStyle = css`
  font-family:
    Roboto Mono,
    SFMono-Regular,
    SF Mono,
    Menlo,
    Consolas,
    Liberation Mono,
    monospace;
  min-height: 0;
  flex: 1;
  padding: 16px;
  background-color: $gray-80;
  color: $white;
  overflow: auto;
  max-width: 100%;
  min-height: 0;
  border-radius: 8px;
  white-space: pre-wrap;
`;
export const KubeConfigFooterStyle = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 128px;
`;

export const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ErrorContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    margin-bottom: 8px;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(211.41deg, #929dad 0%, #d3dbe3 100%);
  }
`;
