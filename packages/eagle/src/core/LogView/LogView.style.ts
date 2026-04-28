import { css } from "@linaria/core";
import { styled } from "@linaria/react";

export const LogViewContainer = styled.div`
  background-color: #00122e;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  span.xterm-decoration-top,
  span[style*="background-color: rgb(254, 168, 25)"] {
    color: #00122e;
  }
  margin-bottom: 10px;
`;

export const LogViewInnerContaier = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
`;

export const LogTerminal = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
  padding-left: 8px;
  border-radius: 8px;
  background-color: #00122e;
  font-family: "Roboto Mono", monospace;
  .xterm .xterm-viewport {
    overflow-y: auto;
    padding-right: 12px;
    border-radius: 8px;
    /* 设置滚动条样式 */
    &::-webkit-scrollbar {
      width: 8px; /* 滚动条的宽度 */
    }

    &::-webkit-scrollbar-track {
      background: #00122e; /* 滚动条轨道的背景色 */
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #6b7d99; /* 滚动条的颜色 */
      border-radius: 10px; /* 滚动条的圆角 */
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: #4a607a; /* 滚动条悬停时的颜色 */
    }
  }
  .xterm .xterm-selection {
    overflow: hidden;
  }
`;

export const CustomContentOverlay = styled.div`
  position: absolute;
  top: 45px; /* 搜索栏高度 */
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 18, 46, 0.7);
  color: #ffffff;
  z-index: 10;
  padding: 20px;
`;

export const SearchInputStyle = css`
  background-color: #00122e;
  border-radius: 5px 0 0 5px;
  .ant-input {
    background-color: #00122e;
    color: #ffffff;
    border: none;
  }
  .ant-input-suffix .counter-text {
    color: #ffffff;
  }
  &.ant-input-affix-wrapper {
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
  }
`;
