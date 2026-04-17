require("dotenv").config();

const fetch = require("node-fetch");

const FIGMA_BASE_URL = "https://api.figma.com/v1";

const getFigmaToken = () => {
  const token = process.env.FIGMA_TOKEN;

  if (!token) {
    throw new Error("请设置 FIGMA_TOKEN 后再运行同步脚本");
  }

  return token;
};

const tryParseJson = (text) => {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

const getResponseErrorMessage = async (res, path) => {
  const text = await res.text();
  const json = tryParseJson(text);
  const detail =
    json?.message || json?.error || json?.err || (typeof text === "string" ? text.trim() : "");

  const lines = [`Figma API 请求失败: ${path} (${res.status})`];

  if (detail) {
    lines.push(`Figma 返回: ${detail}`);
  }

  return lines.join("\n");
};

const fetchJson = async (path) => {
  const res = await fetch(`${FIGMA_BASE_URL}${path}`, {
    headers: {
      "X-Figma-Token": getFigmaToken(),
    },
  });

  if (!res.ok) {
    throw new Error(await getResponseErrorMessage(res, path));
  }

  const json = await res.json();

  if (json.error || (json.status && json.status !== 200)) {
    throw new Error(json.error || `Figma API 返回异常: ${path}`);
  }

  return json;
};

const fetchNode = async (fileKey, nodeId, depth) => {
  const params = new URLSearchParams({
    ids: nodeId,
  });

  if (typeof depth === "number") {
    params.set("depth", String(depth));
  }

  const json = await fetchJson(`/files/${fileKey}/nodes?${params.toString()}`);
  const node = json?.nodes?.[nodeId]?.document;

  if (!node) {
    throw new Error(`Figma API 未返回节点: ${nodeId}`);
  }

  return node;
};

module.exports = {
  fetchNode,
};
