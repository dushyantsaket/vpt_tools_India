import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ArrowLeft,
  Bell,
  Bookmark,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Download,
  Film,
  Flame,
  History,
  Home,
  Menu,
  Mic,
  Moon,
  MoreVertical,
  Play,
  Plus,
  Search,
  Send,
  Share2,
  Sun,
  ThumbsDown,
  ThumbsUp,
  UserRound,
  Video,
  Volume2,
  X,
  Zap,
} from "lucide-react";

const workshopImage = "/images/industrial_hero.png";
const brandImage = "/images/image copy.png";
const shopImage = "/images/login-storefront.jpeg";

const videoEntries = [
  [
    "New Power Tool Video",
    "c7pbUHxBU1E",
    "https://www.youtube.com/watch?v=c7pbUHxBU1E",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "uz6oyGKGvNo",
    "https://www.youtube.com/watch?v=uz6oyGKGvNo",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "k--B1m5L21Y",
    "https://www.youtube.com/watch?v=k--B1m5L21Y",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "XJoFZQqTZ5g",
    "https://www.youtube.com/watch?v=XJoFZQqTZ5g",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "R9oVwrksLOQ",
    "https://www.youtube.com/watch?v=R9oVwrksLOQ",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "cyunO2PI9uI",
    "https://www.youtube.com/watch?v=cyunO2PI9uI",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "pCe5tSvCZmU",
    "https://www.youtube.com/watch?v=pCe5tSvCZmU",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "ZPa9YPL60Tw",
    "https://www.youtube.com/watch?v=ZPa9YPL60Tw",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "vVgtZC5vHa8",
    "https://www.youtube.com/watch?v=vVgtZC5vHa8",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "75RDRhl7gCM",
    "https://www.youtube.com/watch?v=75RDRhl7gCM",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "SqABJOjsi1E",
    "https://www.youtube.com/watch?v=SqABJOjsi1E",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "_5h4K9VvHPg",
    "https://www.youtube.com/watch?v=_5h4K9VvHPg",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "4qOpt7uAPTk",
    "https://www.youtube.com/watch?v=4qOpt7uAPTk",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "latgXtVWndk",
    "https://www.youtube.com/watch?v=latgXtVWndk",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "_u2Jciop7rA",
    "https://www.youtube.com/watch?v=_u2Jciop7rA",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "455x7GRiaCA",
    "https://www.youtube.com/watch?v=455x7GRiaCA",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "ODWFXLnofsE",
    "https://www.youtube.com/watch?v=ODWFXLnofsE",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "yu9f8J8SY_Y",
    "https://www.youtube.com/watch?v=yu9f8J8SY_Y",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "OUvigOOcjks",
    "https://www.youtube.com/watch?v=OUvigOOcjks",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "e9gLPYHOS48",
    "https://www.youtube.com/watch?v=e9gLPYHOS48",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "_cP8H3MhGVs",
    "https://www.youtube.com/watch?v=_cP8H3MhGVs",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "J4GOjk_IG2s",
    "https://www.youtube.com/watch?v=J4GOjk_IG2s",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "s3Fc90kAoL4",
    "https://www.youtube.com/watch?v=s3Fc90kAoL4",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "ACC_yooJtwU",
    "https://www.youtube.com/watch?v=ACC_yooJtwU",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "pja3I2J1E7w",
    "https://www.youtube.com/watch?v=pja3I2J1E7w",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "VGOAokjog2k",
    "https://www.youtube.com/watch?v=VGOAokjog2k",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "lQn6I0VBeKI",
    "https://www.youtube.com/watch?v=lQn6I0VBeKI",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "QcCbvhyLO5s",
    "https://www.youtube.com/watch?v=QcCbvhyLO5s",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "vfQJXJ9WtW0",
    "https://www.youtube.com/watch?v=vfQJXJ9WtW0",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "sOHPHVJBvf4",
    "https://www.youtube.com/watch?v=sOHPHVJBvf4",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "H3DG3IKRPMQ",
    "https://www.youtube.com/watch?v=H3DG3IKRPMQ",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "sB-S5LBU1eA",
    "https://www.youtube.com/watch?v=sB-S5LBU1eA",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "7jZ4Ils-6Fc",
    "https://www.youtube.com/watch?v=7jZ4Ils-6Fc",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "Y3z_aXwuvmg",
    "https://www.youtube.com/watch?v=Y3z_aXwuvmg",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "8dOMXfWmghg",
    "https://www.youtube.com/watch?v=8dOMXfWmghg",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "06RgdZad7zY",
    "https://www.youtube.com/watch?v=06RgdZad7zY",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "cacsJgim5AA",
    "https://www.youtube.com/watch?v=cacsJgim5AA",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "fgeGF5E_fYc",
    "https://www.youtube.com/watch?v=fgeGF5E_fYc",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "-12y0tNwriw",
    "https://www.youtube.com/watch?v=-12y0tNwriw",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "xeIwSHB8EuY",
    "https://www.youtube.com/watch?v=xeIwSHB8EuY",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "gvCmY77M9Kc",
    "https://www.youtube.com/watch?v=gvCmY77M9Kc",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "RpmIQtRLStk",
    "https://www.youtube.com/watch?v=RpmIQtRLStk",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "H5Rm3zTC6AM",
    "https://www.youtube.com/watch?v=H5Rm3zTC6AM",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "0U0L18qG1ok",
    "https://www.youtube.com/watch?v=0U0L18qG1ok",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "2CO8fcbQ_LQ",
    "https://www.youtube.com/watch?v=2CO8fcbQ_LQ",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "vFmlePAmEd0",
    "https://www.youtube.com/watch?v=vFmlePAmEd0",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "nTDYjz7JfTY",
    "https://www.youtube.com/watch?v=nTDYjz7JfTY",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "dEGAmYD6yaU",
    "https://www.youtube.com/watch?v=dEGAmYD6yaU",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "xyF0AR1r8OQ",
    "https://www.youtube.com/watch?v=xyF0AR1r8OQ",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "UfTYnmhu5WE",
    "https://www.youtube.com/watch?v=UfTYnmhu5WE",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "3RcQ6g3yw3Y",
    "https://www.youtube.com/watch?v=3RcQ6g3yw3Y",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "AF8LSurfct4",
    "https://www.youtube.com/watch?v=AF8LSurfct4",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "9_zwYbLJ_Io",
    "https://www.youtube.com/watch?v=9_zwYbLJ_Io",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "-2WGpCIcBk0",
    "https://www.youtube.com/watch?v=-2WGpCIcBk0",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "sO-ssqm9jPk",
    "https://www.youtube.com/watch?v=sO-ssqm9jPk",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "0BxgPMDXiD4",
    "https://www.youtube.com/watch?v=0BxgPMDXiD4",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "qsrTb3onKGw",
    "https://www.youtube.com/watch?v=qsrTb3onKGw",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "Q49LeYh1bH0",
    "https://www.youtube.com/watch?v=Q49LeYh1bH0",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "BM39OouLNsM",
    "https://www.youtube.com/watch?v=BM39OouLNsM",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "C1dgH5f-H8s",
    "https://www.youtube.com/watch?v=C1dgH5f-H8s",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "jCslvaFhENw",
    "https://www.youtube.com/watch?v=jCslvaFhENw",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "TY7sVd-wBu8",
    "https://www.youtube.com/watch?v=TY7sVd-wBu8",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "gWYm8Pzaarc",
    "https://www.youtube.com/watch?v=gWYm8Pzaarc",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "rd9_DF-0TZI",
    "https://www.youtube.com/watch?v=rd9_DF-0TZI",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "oVrCfdAWSPc",
    "https://www.youtube.com/watch?v=oVrCfdAWSPc",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "KKjzIoDH6EQ",
    "https://www.youtube.com/watch?v=KKjzIoDH6EQ",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "SLrX7A2F2as",
    "https://www.youtube.com/watch?v=SLrX7A2F2as",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "wxshrT3PrP4",
    "https://www.youtube.com/watch?v=wxshrT3PrP4",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "ackGLqgXq24",
    "https://www.youtube.com/watch?v=ackGLqgXq24",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "UzjaNklcQ9k",
    "https://www.youtube.com/watch?v=UzjaNklcQ9k",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "M-vREdEZMgQ",
    "https://www.youtube.com/watch?v=M-vREdEZMgQ",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "Jnp7t4c_Egc",
    "https://www.youtube.com/watch?v=Jnp7t4c_Egc",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "NO2R_vOPrYo",
    "https://www.youtube.com/watch?v=NO2R_vOPrYo",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "myxO49L-hfQ",
    "https://www.youtube.com/watch?v=myxO49L-hfQ",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "3vaD0gskDlY",
    "https://www.youtube.com/watch?v=3vaD0gskDlY",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "x3TLDmMDuCI",
    "https://www.youtube.com/watch?v=x3TLDmMDuCI",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "xSn-TtFPchM",
    "https://www.youtube.com/watch?v=xSn-TtFPchM",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "OFlNZf1Nlgk",
    "https://www.youtube.com/watch?v=OFlNZf1Nlgk",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "FBHXYJ4_Pu8",
    "https://www.youtube.com/watch?v=FBHXYJ4_Pu8",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "tho2d0i0bqA",
    "https://www.youtube.com/watch?v=tho2d0i0bqA",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "WbdJa4G-ZM0",
    "https://www.youtube.com/watch?v=WbdJa4G-ZM0",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "AZwodco-qss",
    "https://www.youtube.com/watch?v=AZwodco-qss",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "IcM2w2VKdbA",
    "https://www.youtube.com/watch?v=IcM2w2VKdbA",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "lCKU-tI-upI",
    "https://www.youtube.com/watch?v=lCKU-tI-upI",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "q71E_UqHBYM",
    "https://www.youtube.com/watch?v=q71E_UqHBYM",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "qLRSxp11lEQ",
    "https://www.youtube.com/watch?v=qLRSxp11lEQ",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "f8KF7taQkU8",
    "https://www.youtube.com/watch?v=f8KF7taQkU8",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "pSVk-5WemQ0",
    "https://www.youtube.com/watch?v=pSVk-5WemQ0",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "YGf_oi2BbuQ",
    "https://www.youtube.com/watch?v=YGf_oi2BbuQ",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "h231qlqI-dg",
    "https://www.youtube.com/watch?v=h231qlqI-dg",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "RpjdrP-pGek",
    "https://www.youtube.com/watch?v=RpjdrP-pGek",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "WuvLbnFG8yg",
    "https://www.youtube.com/watch?v=WuvLbnFG8yg",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "vIu573xm_G0",
    "https://www.youtube.com/watch?v=vIu573xm_G0",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "iJ2AzYfLFCQ",
    "https://www.youtube.com/watch?v=iJ2AzYfLFCQ",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "JgDNFQ2RaLQ",
    "https://www.youtube.com/watch?v=JgDNFQ2RaLQ",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "eIxsLW5NPCQ",
    "https://www.youtube.com/watch?v=eIxsLW5NPCQ",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "K_olxdJqhnc",
    "https://www.youtube.com/watch?v=K_olxdJqhnc",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "OOM36shBpFA",
    "https://www.youtube.com/watch?v=OOM36shBpFA",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "5lrAW4WWk08",
    "https://www.youtube.com/watch?v=5lrAW4WWk08",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "TTx7Y3a7EmA",
    "https://www.youtube.com/watch?v=TTx7Y3a7EmA",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "Zih3dfbjZ8g",
    "https://www.youtube.com/watch?v=Zih3dfbjZ8g",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "0Gg7kHKlC_4",
    "https://www.youtube.com/watch?v=0Gg7kHKlC_4",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "Y2m-TlGyGwY",
    "https://www.youtube.com/watch?v=Y2m-TlGyGwY",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "9s8GH7nmDh4",
    "https://www.youtube.com/watch?v=9s8GH7nmDh4",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "vFDccO75AV8",
    "https://www.youtube.com/watch?v=vFDccO75AV8",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "D3gcPo0y4fc",
    "https://www.youtube.com/watch?v=D3gcPo0y4fc",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "ScMkywEH5JM",
    "https://www.youtube.com/watch?v=ScMkywEH5JM",
    ["power-tools", "new"],
  ],
  [
    "New Power Tool Video",
    "exmSJpJvIPs",
    "https://www.youtube.com/watch?v=exmSJpJvIPs",
    ["power-tools", "new"],
  ],
  // New Hand Tool Videos
  [
    "Hand Tool Video",
    "mND8zSQzD8U",
    "https://www.youtube.com/watch?v=mND8zSQzD8U",
    ["hand-tools", "new"],
  ],
  [
    "Hand Tool Video",
    "BGdRpEwgK50",
    "https://www.youtube.com/watch?v=BGdRpEwgK50",
    ["hand-tools", "new"],
  ],
  [
    "Hand Tool Video",
    "3TiSYh7cJko",
    "https://www.youtube.com/watch?v=3TiSYh7cJko",
    ["hand-tools", "new"],
  ],
  [
    "Hand Tool Video",
    "ebQjFGvRlTA",
    "https://www.youtube.com/watch?v=ebQjFGvRlTA",
    ["hand-tools", "new"],
  ],
  [
    "Hand Tool Video",
    "lKH3nFnNEDY",
    "https://www.youtube.com/watch?v=lKH3nFnNEDY",
    ["hand-tools", "new"],
  ],
  [
    "Hand Tool Video",
    "4o0tqF0jDdo",
    "https://www.youtube.com/watch?v=4o0tqF0jDdo",
    ["hand-tools", "new"],
  ],
  [
    "Hand Tool Video",
    "j7GLPAyK6cM",
    "https://www.youtube.com/watch?v=j7GLPAyK6cM",
    ["hand-tools", "new"],
  ],
  [
    "Hand Tool Video",
    "zhy5EFAQCL4",
    "https://www.youtube.com/watch?v=zhy5EFAQCL4",
    ["hand-tools", "new"],
  ],
  [
    "Hand Tool Video",
    "6WNTMKFLjZQ",
    "https://www.youtube.com/watch?v=6WNTMKFLjZQ",
    ["hand-tools", "new"],
  ],
  [
    "Hand Tool Video",
    "C1_KriNcdgs",
    "https://www.youtube.com/watch?v=C1_KriNcdgs",
    ["hand-tools", "new"],
  ],
  [
    "Hand Tool Video",
    "3aql7SjSz_k",
    "https://www.youtube.com/watch?v=3aql7SjSz_k",
    ["hand-tools", "new"],
  ],
  [
    "Hand Tool Video",
    "eI7yTw8f-WQ",
    "https://www.youtube.com/watch?v=eI7yTw8f-WQ",
    ["hand-tools", "new"],
  ],
  // Power tool videos from previous list
  [
    "NEW 2026 ≡ƒöÑCordless Drill Machine...",
    "PWngodaobZw",
    "https://www.youtube.com/watch?v=PWngodaobZw",
    ["power-tools", "cordless"],
  ],
  [
    "CNC carbide tools wholesale market delhi...",
    "JIrI6hZ5PIw",
    "https://www.youtube.com/watch?v=JIrI6hZ5PIw",
    ["power-tools"],
  ],
  [
    "≡ƒº░ These 10 Tools Replaced Almost Everything I Used Before",
    "qGrlbTGxh5M",
    "https://www.youtube.com/watch?v=qGrlbTGxh5M",
    ["power-tools"],
  ],
  [
    "The Truth About AI Coding in 2026",
    "sO-ssqm9jPk",
    "https://www.youtube.com/watch?v=sO-ssqm9jPk",
    ["new", "streams"],
  ],
  // New Cordless Videos
  // ent  // New Cordless Videos
  [
    "New Cordless Tool Video",
    "WlRn5Zf6j0I",
    "https://www.youtube.com/watch?v=WlRn5Zf6j0I",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "ey8QUtehPJo",
    "https://www.youtube.com/watch?v=ey8QUtehPJo",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "BhVqZsrZ3F8",
    "https://www.youtube.com/watch?v=BhVqZsrZ3F8",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "Irfe2xsIoTg",
    "https://www.youtube.com/watch?v=Irfe2xsIoTg",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "cZd0ukbYaGg",
    "https://www.youtube.com/watch?v=cZd0ukbYaGg",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "ooyjUAh05VI",
    "https://www.youtube.com/watch?v=ooyjUAh05VI",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "cCCixhPoJ08",
    "https://www.youtube.com/watch?v=cCCixhPoJ08",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "01A52IW69tA",
    "https://www.youtube.com/watch?v=01A52IW69tA",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "LQjS6AgDEw8",
    "https://www.youtube.com/watch?v=LQjS6AgDEw8",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "2Gu4NdgsUFc",
    "https://www.youtube.com/watch?v=2Gu4NdgsUFc",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "Uatd-FzIM8w",
    "https://www.youtube.com/watch?v=Uatd-FzIM8w",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "kiaKyfvffrQ",
    "https://www.youtube.com/watch?v=kiaKyfvffrQ",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "Nm7pKHFKNSQ",
    "https://www.youtube.com/watch?v=Nm7pKHFKNSQ",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "QP4VFKgAy0Q",
    "https://www.youtube.com/watch?v=QP4VFKgAy0Q",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "lHXVOZ2vziI",
    "https://www.youtube.com/watch?v=lHXVOZ2vziI",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "KHxQ8IEcDWw",
    "https://www.youtube.com/watch?v=KHxQ8IEcDWw",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "kHJ7LvUV64g",
    "https://www.youtube.com/watch?v=kHJ7LvUV64g",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "w4-GXIRNt4A",
    "https://www.youtube.com/watch?v=w4-GXIRNt4A",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "KhyW-Umk7sY",
    "https://www.youtube.com/watch?v=KhyW-Umk7sY",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "dGlLSxiXSMY",
    "https://www.youtube.com/watch?v=dGlLSxiXSMY",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "lGINq5VqazE",
    "https://www.youtube.com/watch?v=lGINq5VqazE",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "yYW-W32ne4Q",
    "https://www.youtube.com/watch?v=yYW-W32ne4Q",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "QqwIcd2BE50",
    "https://www.youtube.com/watch?v=QqwIcd2BE50",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "KpdR5b2Sc4c",
    "https://www.youtube.com/watch?v=KpdR5b2Sc4c",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "Ks9n4vzcGn8",
    "https://www.youtube.com/watch?v=Ks9n4vzcGn8",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "zGZL2Sr2Uv0",
    "https://www.youtube.com/watch?v=zGZL2Sr2Uv0",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "RM-dLZvTr1E",
    "https://www.youtube.com/watch?v=RM-dLZvTr1E",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "w5R4jrMOM_I",
    "https://www.youtube.com/watch?v=w5R4jrMOM_I",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "CAFzVdYtJRU",
    "https://www.youtube.com/watch?v=CAFzVdYtJRU",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "8oktaqF9rRs",
    "https://www.youtube.com/watch?v=8oktaqF9rRs",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "EiWTp7GlxfI",
    "https://www.youtube.com/watch?v=EiWTp7GlxfI",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "j29M9R7B2TQ",
    "https://www.youtube.com/watch?v=j29M9R7B2TQ",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "qjkG-F1Myqg",
    "https://www.youtube.com/watch?v=qjkG-F1Myqg",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "NsYa3G79Q0g",
    "https://www.youtube.com/watch?v=NsYa3G79Q0g",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "KOVoYzSWeh4",
    "https://www.youtube.com/watch?v=KOVoYzSWeh4",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "jPNboBdnZEY",
    "https://www.youtube.com/watch?v=jPNboBdnZEY",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "R27xxD8-leE",
    "https://www.youtube.com/watch?v=R27xxD8-leE",
    ["cordless", "new"],
  ],
  [
    "New Cordless Tool Video",
    "-TEz9p2oVDE",
    "https://www.youtube.com/watch?v=-TEz9p2oVDE",
    ["cordless", "new"],
  ],
  // New Hand Tool Videos from request
  [
    "New Hand Tool Video",
    "COP--h6QRFg",
    "https://www.youtube.com/watch?v=COP--h6QRFg",
    ["hand-tools", "new"],
  ],
  [
    "New Hand Tool Video",
    "K-1M8ifKZ5Y",
    "https://www.youtube.com/watch?v=K-1M8ifKZ5Y",
    ["hand-tools", "new"],
  ],
  [
    "New Hand Tool Video",
    "ctMTp7hApcQ",
    "https://www.youtube.com/watch?v=ctMTp7hApcQ",
    ["hand-tools", "new"],
  ],
  [
    "New Hand Tool Video",
    "i7ZyQRVCRN8",
    "https://www.youtube.com/watch?v=i7ZyQRVCRN8",
    ["hand-tools", "new"],
  ],
  [
    "New Hand Tool Video",
    "LW-2yYoAc0E",
    "https://www.youtube.com/watch?v=LW-2yYoAc0E",
    ["hand-tools", "new"],
  ],
  [
    "New Hand Tool Video",
    "9viHPONDIjU",
    "https://www.youtube.com/watch?v=9viHPONDIjU",
    ["hand-tools", "new"],
  ],
  [
    "New Hand Tool Video",
    "EaGCqFadZYo",
    "https://www.youtube.com/watch?v=EaGCqFadZYo",
    ["hand-tools", "new"],
  ],
  [
    "New Hand Tool Video",
    "Rjwf38JpNGw",
    "https://www.youtube.com/watch?v=Rjwf38JpNGw",
    ["hand-tools", "new"],
  ],
  [
    "New Hand Tool Video",
    "nyfukKZecnY",
    "https://www.youtube.com/watch?v=nyfukKZecnY",
    ["hand-tools", "new"],
  ],
  [
    "New Hand Tool Video",
    "Q-wC7Kmhg_E",
    "https://www.youtube.com/watch?v=Q-wC7Kmhg_E",
    ["hand-tools", "new"],
  ],
  [
    "New Hand Tool Video",
    "SnEKplsDiPw",
    "https://www.youtube.com/watch?v=SnEKplsDiPw",
    ["hand-tools", "new"],
  ],
  [
    "New Hand Tool Video",
    "CLgZ2Wpuj0o",
    "https://www.youtube.com/watch?v=CLgZ2Wpuj0o",
    ["hand-tools", "new"],
  ],
  [
    "New Hand Tool Video",
    "GU84t3iTG74",
    "https://www.youtube.com/watch?v=GU84t3iTG74",
    ["hand-tools", "new"],
  ],
  [
    "New Hand Tool Video",
    "w5R4jrMOM_I",
    "https://www.youtube.com/watch?v=w5R4jrMOM_I",
    ["hand-tools", "new"],
  ],
  [
    "New Hand Tool Video",
    "T8hqLiB7kfU",
    "https://www.youtube.com/watch?v=T8hqLiB7kfU",
    ["hand-tools", "new"],
  ],
  [
    "New Hand Tool Video",
    "fw04yuMM1IU",
    "https://www.youtube.com/watch?v=fw04yuMM1IU",
    ["hand-tools", "new"],
  ],
  [
    "New Hand Tool Video",
    "13q83q7rFbw",
    "https://www.youtube.com/watch?v=13q83q7rFbw",
    ["hand-tools", "new"],
  ],
  [
    "New Hand Tool Video",
    "7FpV4aAryco",
    "https://www.youtube.com/watch?v=7FpV4aAryco",
    ["hand-tools", "new"],
  ],
  [
    "New Hand Tool Video",
    "1kO9WpH3ark",
    "https://www.youtube.com/watch?v=1kO9WpH3ark",
    ["hand-tools", "new"],
  ],
  [
    "New Hand Tool Video",
    "zVwSGrcv-lw",
    "https://www.youtube.com/watch?v=zVwSGrcv-lw",
    ["hand-tools", "new"],
  ],
  [
    "New Hand Tool Video",
    "ey8QUtehPJo",
    "https://www.youtube.com/watch?v=ey8QUtehPJo",
    ["hand-tools", "new"],
  ],
  [
    "New Hand Tool Video",
    "0A4ShUODte4",
    "https://www.youtube.com/watch?v=0A4ShUODte4",
    ["hand-tools", "new"],
  ],
  [
    "New Hand Tool Video",
    "eSefnmQTccw",
    "https://www.youtube.com/watch?v=eSefnmQTccw",
    ["hand-tools", "new"],
  ],
  [
    "New Hand Tool Video",
    "hfdRlDrPAdM",
    "https://www.youtube.com/watch?v=hfdRlDrPAdM",
    ["hand-tools", "new"],
  ],
];
// ent type ke alaga ];

const videos = videoEntries.map(
  ([title, youtubeId, url, tags = []], index) => ({
    id: `v-${index + 1}`,
    youtubeId,
    url,
    title,
    channel: tags.includes("nodejs") ? "Dushyant Dev" : "Dushyant Power Tools",
    tags,
    views: `${Math.floor(40 + (index % 7) * 6)}.${(index % 10) + 1}K views`,
    age: `${1 + (index % 4)} days ago`,
    duration: `${3 + (index % 6)}:${String(15 + ((index * 5) % 40)).padStart(2, "0")}`,
    thumb: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
    localFallback: [workshopImage, brandImage, shopImage][index % 3],
    description: tags.includes("nodejs")
      ? "Node.js backend and stream content."
      : "Power Tools, cordless tools and hardware market content.",
    likes: 1200 + index * 85,
    userAction: null,
    watched: index < 7,
    newToYou: index >= 16,
    uploadedAt: Date.now() - index * 1000 * 60 * 60 * 4,
  }),
);

const API_BASE = import.meta.env.VITE_API_URL || "";

function filterVideos(videos, filter) {
  switch (filter) {
    case "All":
      return videos;
    case "Power Tools":
      return videos.filter((video) => video.tags.includes("power-tools"));
    case "Hand Tools":
      return videos.filter((video) => video.tags.includes("hand-tools"));
    case "Cordless":
      return videos.filter((video) => video.tags.includes("cordless"));
    case "Streams":
      return videos.filter((video) => video.tags.includes("streams"));
    case "Node.js":
      return videos.filter((video) => video.tags.includes("nodejs"));
    case "Recently uploaded":
      return [...videos].sort((a, b) => b.uploadedAt - a.uploadedAt);
    case "Watched":
      return videos.filter((video) => video.watched);
    case "New to you":
      return videos.filter((video) => video.newToYou);
    default:
      return videos;
  }
}

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function getFallbackDuration(index) {
  const minutes = 8 + (index % 8);
  const seconds = 10 + ((index * 13) % 50);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

const shortEntries = [
  ["Hgr6tPwiWP8", "https://www.youtube.com/shorts/Hgr6tPwiWP8"],
  ["9MYy_MDObbo", "https://www.youtube.com/shorts/9MYy_MDObbo"],
  ["SofSjKxaoY4", "https://www.youtube.com/shorts/SofSjKxaoY4"],
  ["0MXGMJmdR6Q", "https://www.youtube.com/shorts/0MXGMJmdR6Q"],
  ["D43xIaF1TJQ", "https://www.youtube.com/shorts/D43xIaF1TJQ"],
  ["KYjcC1ylLfw", "https://www.youtube.com/shorts/KYjcC1ylLfw"],
  ["RPRRHm90Dh0", "https://www.youtube.com/shorts/RPRRHm90Dh0"],
  ["Q2mTKWOClVI", "https://www.youtube.com/shorts/Q2mTKWOClVI"],
  ["VPtWUH13jxo", "https://www.youtube.com/shorts/VPtWUH13jxo"],
  ["jDhFfTc2bvU", "https://www.youtube.com/shorts/jDhFfTc2bvU"],
  ["FJOMkUG5Sxg", "https://www.youtube.com/shorts/FJOMkUG5Sxg"],
  ["hIkgivfkwYI", "https://www.youtube.com/shorts/hIkgivfkwYI"],
  ["qNQUFS-1Gm4", "https://www.youtube.com/shorts/qNQUFS-1Gm4"],
  ["X2e_13UAPlo", "https://www.youtube.com/shorts/X2e_13UAPlo"],
  ["Qk17yDVRVng", "https://www.youtube.com/shorts/Qk17yDVRVng"],
  // New Cordless Shorts
  ["Mx4au8lozmg", "https://www.youtube.com/shorts/Mx4au8lozmg"],
  ["6yuK_zNjsco", "https://www.youtube.com/shorts/6yuK_zNjsco"],
  ["X_GX9XIgeR4", "https://www.youtube.com/shorts/X_GX9XIgeR4"],
  ["MS6XzgPdUm4", "https://www.youtube.com/shorts/MS6XzgPdUm4"],
  ["PqUAlsT8rNk", "https://www.youtube.com/shorts/PqUAlsT8rNk"],
  ["LADhiPxaLRk", "https://www.youtube.com/shorts/LADhiPxaLRk"],
  ["C5db6gJXrO8", "https://www.youtube.com/shorts/C5db6gJXrO8"],
  ["xJ_YQSkCZS4", "https://www.youtube.com/shorts/xJ_YQSkCZS4"],
  ["SwICyEl-vHI", "https://www.youtube.com/shorts/SwICyEl-vHI"],
  ["2Wjce9qlroo", "https://www.youtube.com/shorts/2Wjce9qlroo"],
  ["JnQMPh995ak", "https://www.youtube.com/shorts/JnQMPh995ak"],
  ["0Dj_rCysCnI", "https://www.youtube.com/shorts/0Dj_rCysCnI"],
  ["ybs0wAzpcaE", "https://www.youtube.com/shorts/ybs0wAzpcaE"],
  ["uth8OfAVUTw", "https://www.youtube.com/shorts/uth8OfAVUTw"],
  ["04KntzsmJZo", "https://www.youtube.com/shorts/04KntzsmJZo"],
  ["M35YQ0jP_00", "https://www.youtube.com/shorts/M35YQ0jP_00"],
  ["_uEj3zmsMMQ", "https://www.youtube.com/shorts/_uEj3zmsMMQ"],
  ["x2ySNgh28Wc", "https://www.youtube.com/shorts/x2ySNgh28Wc"],
  ["z1IH-z7Fqok", "https://www.youtube.com/shorts/z1IH-z7Fqok"],
  ["MO1V71bQKiE", "https://www.youtube.com/shorts/MO1V71bQKiE"],
  ["EQnWUNftk1E", "https://www.youtube.com/shorts/EQnWUNftk1E"],
  ["5aVEg5zF-TE", "https://www.youtube.com/shorts/5aVEg5zF-TE"],
  ["Xbfl3AN_Oc8", "https://www.youtube.com/shorts/Xbfl3AN_Oc8"],
  ["Z-II50eI-yI", "https://www.youtube.com/shorts/Z-II50eI-yI"],
  ["tjlvhBM-IEo", "https://www.youtube.com/shorts/tjlvhBM-IEo"],
  ["WItvjqeCOvU", "https://www.youtube.com/shorts/WItvjqeCOvU"],
  ["5hRqZ4oRblA", "https://www.youtube.com/shorts/5hRqZ4oRblA"],
  ["Mqh_FZoYwOc", "https://www.youtube.com/shorts/Mqh_FZoYwOc"],
  ["tSzi_IiUt94", "https://www.youtube.com/shorts/tSzi_IiUt94"],
  ["o3cruiOYMnw", "https://www.youtube.com/shorts/o3cruiOYMnw"],
  // New Hand Tool Shorts
  ["YL44AQMIn4s", "https://www.youtube.com/shorts/YL44AQMIn4s"],
  ["7nev-vVMqEE", "https://www.youtube.com/shorts/7nev-vVMqEE"],
  ["aHX-XnQ3DTs", "https://www.youtube.com/shorts/aHX-XnQ3DTs"],
  ["n3anvxrL7QM", "https://www.youtube.com/shorts/n3anvxrL7QM"],
  ["FNTpJtYF_hQ", "https://www.youtube.com/shorts/FNTpJtYF_hQ"],
  ["hds92aSbE20", "https://www.youtube.com/shorts/hds92aSbE20"],
  ["Zs-Ffz3hX1g", "https://www.youtube.com/shorts/Zs-Ffz3hX1g"],
  ["k00g6pg3sI8", "https://www.youtube.com/shorts/k00g6pg3sI8"],
  ["C5db6gJXrO8", "https://www.youtube.com/shorts/C5db6gJXrO8"],
  ["6htWk3y62HY", "https://www.youtube.com/shorts/6htWk3y62HY"],
  ["xoH1eWCuazA", "https://www.youtube.com/shorts/xoH1eWCuazA"],
  ["ywiYz5aymzE", "https://www.youtube.com/shorts/ywiYz5aymzE"],
  ["tjlvhBM-IEo", "https://www.youtube.com/shorts/tjlvhBM-IEo"],
  ["Mqh_FZoYwOc", "https://www.youtube.com/shorts/Mqh_FZoYwOc"],
  ["GOhAQOl-Aig", "https://www.youtube.com/shorts/GOhAQOl-Aig"],
];

const shorts = shortEntries.map(([youtubeId, url], index) => ({
  id: `s-${index + 1}`,
  youtubeId,
  url,
  title:
    index === 0
      ? "Ingco power tools | tools market Delhi,ΓÇª"
      : index === 1
        ? "αñ╕αñ┐αñ░ αñ«αÑçαñé αñ½αÑïαñíαñ╝αÑç αñ½αÑüαñéαñ╕αÑÇ αñòαñ╛ αñçαñ▓αñ╛αñ£"
        : `Short Clip ${index + 1}`,
  views: `${4 + (index % 6)}.${(index % 10) + 1}K views`,
  thumb: `https://i.ytimg.com/vi/${youtubeId}/frame0.jpg`,
  isAd: false,
}));

const chips = [
  "All",
  "Power Tools",
  "Hand Tools",
  "Cordless",
  "Streams",
  "Node.js",
  "Shorts",
  "Recently uploaded",
  "Watched",
  "New to you",
];

function getEmbedUrl(video, autoplay = false) {
  return `https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1&playsinline=1${autoplay ? "&autoplay=1" : ""}`;
}

function Logo() {
  return (
    <div className="ytx-logo">
      <span>
        <Zap size={18} fill="currentColor" />
      </span>
      <div>
        <strong>DUSHYANT</strong>
        <em>POWER TOOLS</em>
      </div>
    </div>
  );
}

function Header({ theme, setTheme, setPage, setDrawerOpen }) {
  return (
    <header className="ytx-header">
      <div className="ytx-left">
        <button
          className="ytx-icon"
          onClick={() => setDrawerOpen(true)}
          type="button"
        >
          <Menu size={23} />
        </button>
        <button
          className="ytx-logo-btn"
          onClick={() => setPage("home")}
          type="button"
        >
          <Logo />
        </button>
      </div>
      <form className="ytx-search">
        <input placeholder="Search videos, channels, tools..." />
        <button type="button">
          <Search size={22} />
        </button>
      </form>
      <div className="ytx-actions">
        <button className="ytx-icon ytx-hide-sm" type="button">
          <Mic size={21} />
        </button>
        <button className="ytx-create" type="button">
          <Plus size={18} />
          Create
        </button>
        <button className="ytx-icon ytx-hide-xs" type="button">
          <Bell size={21} />
          <i>5</i>
        </button>
        <button
          className="ytx-icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          type="button"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="ytx-avatar" type="button">
          <UserRound size={21} />
        </button>
      </div>
    </header>
  );
}

function Sidebar({ page, setPage }) {
  const items = [
    ["home", "Home", Home],
    ["shorts", "Shorts", Flame],
    ["subscriptions", "Subscriptions", Video],
    ["library", "Library", Film],
    ["history", "History", History],
    ["watchlater", "Watch Later", Clock],
    ["liked", "Liked Videos", ThumbsUp],
    ["downloads", "Downloads", Download],
    ["yourvideos", "Your Videos", Video],
    ["playlists", "Playlists", Bookmark],
  ];
  return (
    <aside className="ytx-sidebar">
      {items.map((item, index) => {
        const [key, label, Icon] = item;
        return (
          <React.Fragment key={key}>
            {(index === 3 || index === 8) && <div className="ytx-divider" />}
            <button
              className={page === key ? "is-active" : ""}
              onClick={() =>
                (key === "shorts" || key === "home") && setPage(key)
              }
              type="button"
            >
              <Icon size={19} />
              <span>{label}</span>
            </button>
          </React.Fragment>
        );
      })}
      <div className="ytx-divider" />
      <h3>Subscriptions</h3>
      {[
        "Dushyant Power Tools",
        "Tool Review Pro",
        "The Tool Zone",
        "Machinery Hub",
      ].map((name) => (
        <button key={name} type="button">
          <b>{name[0]}</b>
          <span>{name}</span>
        </button>
      ))}
    </aside>
  );
}

function Drawer({ open, setOpen, setPage }) {
  return (
    <>
      <div
        className={`ytx-scrim ${open ? "visible" : ""}`}
        onClick={() => setOpen(false)}
      />
      <div className={`ytx-drawer ${open ? "visible" : ""}`}>
        <div className="ytx-drawer-head">
          <Logo />
          <button
            className="ytx-icon"
            onClick={() => setOpen(false)}
            type="button"
          >
            <X size={21} />
          </button>
        </div>
        <Sidebar
          page=""
          setPage={(p) => {
            setPage(p);
            setOpen(false);
          }}
        />
      </div>
    </>
  );
}

function VideoThumb({ video, onClick, compact = false }) {
  return (
    <article
      className={compact ? "ytx-compact" : "ytx-card"}
      onClick={() => onClick(video)}
    >
      <div className="ytx-thumb">
        <img
          src={video.thumb}
          onError={(e) => {
            e.currentTarget.src = video.localFallback;
          }}
          alt={video.title}
          loading="lazy"
        />
        <span>{video.duration}</span>
      </div>
      <div className="ytx-meta">
        {!compact && (
          <b>
            <Zap size={15} fill="currentColor" />
          </b>
        )}
        <div>
          <h3>{video.title}</h3>
          <p>
            {video.channel} <CheckCircle2 size={13} />
          </p>
          <small>
            {video.views} ΓÇó {video.age}
          </small>
        </div>
      </div>
      {compact && (
        <button type="button">
          <MoreVertical size={18} />
        </button>
      )}
    </article>
  );
}

function HomePage({
  videos,
  openVideo,
  setPage,
  selectedChip,
  setSelectedChip,
  loadMore,
}) {
  return (
    <main className="ytx-feed">
      <div className="ytx-chips">
        {chips.map((chip) => (
          <button
            className={chip === selectedChip ? "is-active" : ""}
            key={chip}
            onClick={() => {
              setSelectedChip(chip);
              if (chip === "Shorts") {
                setPage("shorts");
              }
            }}
            type="button"
          >
            {chip}
          </button>
        ))}
      </div>
      <div className="ytx-grid">
        <AdCard />
        {videos.map((video) => (
          <VideoThumb key={video.id} video={video} onClick={openVideo} />
        ))}
        <div ref={loadMore} />
      </div>
      <section className="ytx-shelf">
        <div>
          <h2>Shorts</h2>
          <button onClick={() => setPage("shorts")} type="button">
            View all
          </button>
        </div>
        <div className="ytx-shorts-strip">
          {shorts.slice(0, 8).map((short) => (
            <button
              key={short.id}
              className="ytx-short-lockup"
              onClick={() => setPage("shorts")}
              type="button"
            >
              <img src={short.thumb} alt={short.title} loading="lazy" />
              <h3>{short.title}</h3>
              <p>{short.views}</p>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

function AdCard() {
  return (
    <article className="ytx-card ytx-ad">
      <div className="ytx-ad-art">
        <h2>THE FUTURE OF AI-POWERED ITSM IS HERE</h2>
      </div>
      <div className="ytx-meta">
        <b>A</b>
        <div>
          <h3>Jira Service Management brings you ITSM powered by AI</h3>
          <p>
            <strong>Sponsored</strong> ΓÇó Jira Service Management
          </p>
        </div>
      </div>
      <div className="ytx-ad-buttons">
        <button>Watch</button>
        <button>Visit site</button>
      </div>
    </article>
  );
}

function WatchPage({
  activeVideo,
  openVideo,
  comments,
  setComments,
  goBack,
  suggestions,
  onVideoAction,
}) {
  const [draft, setDraft] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setComments([
      { name: "Guest User", text: draft.trim(), time: "Just now" },
      ...comments,
    ]);
    setDraft("");
  };

  const handleShare = async () => {
    const shareData = {
      title: activeVideo.title,
      text: `Check out this video: ${activeVideo.title}`,
      url: activeVideo.url,
    };
    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(activeVideo.url);
        alert("Video link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      alert("Could not share video.");
    }
  };

  return (
    <main className="ytx-watch">
      <section className="ytx-watch-primary">
        <button className="ytx-back" onClick={goBack} type="button">
          <ArrowLeft size={20} /> Back
        </button>
        <div className="ytx-player">
          <iframe
            src={getEmbedUrl(activeVideo, true)}
            title={activeVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <h1>{activeVideo.title}</h1>
        <div className="ytx-owner-row">
          <div className="ytx-owner">
            <b>
              <Zap size={18} fill="currentColor" />
            </b>
            <div>
              <strong>
                {activeVideo.channel} <CheckCircle2 size={14} />
              </strong>
              <small>12.5K subscribers</small>
            </div>
          </div>
          <button className="ytx-subscribe" type="button">
            Subscribe
          </button>
          <div className="ytx-watch-actions">
            <button
              type="button"
              onClick={() => onVideoAction(activeVideo.id, "like")}
              className={activeVideo.userAction === "like" ? "is-active" : ""}
            >
              <ThumbsUp size={18} />
              {activeVideo.likes.toLocaleString()}
            </button>
            <button
              type="button"
              onClick={() => onVideoAction(activeVideo.id, "dislike")}
              className={
                activeVideo.userAction === "dislike" ? "is-active" : ""
              }
            >
              <ThumbsDown size={18} />
            </button>
            <button type="button" onClick={handleShare}>
              <Share2 size={18} />
              Share
            </button>
            <button
              type="button"
              className="ytx-hide-sm"
              onClick={() => alert("Download feature coming soon!")}
            >
              <Download size={18} />
              Download
            </button>
            <button type="button">
              <Bookmark size={18} />
              Save
            </button>
            <button type="button">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>
        <div className="ytx-description">
          <strong>
            {activeVideo.views} ΓÇó {activeVideo.age}
          </strong>
          <p>{activeVideo.description}</p>
          <p>#PowerTools #Streams #DushyantPowerTools</p>
        </div>
        <section className="ytx-comments">
          <h2>{comments.length.toLocaleString()} Comments</h2>
          <form onSubmit={submit}>
            <span>G</span>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Add a comment..."
            />
            <button type="submit">
              <Send size={18} />
            </button>
          </form>
          {comments.map((comment, index) => (
            <article key={`${comment.name}-${index}`}>
              <span>{comment.name[0]}</span>
              <div>
                <strong>
                  {comment.name} <small>{comment.time}</small>
                </strong>
                <p>{comment.text}</p>
                <button>
                  <ThumbsUp size={16} /> Like
                </button>
                <button>Reply</button>
              </div>
              <MoreVertical size={18} />
            </article>
          ))}
        </section>
      </section>
      <aside className="ytx-watch-side">
        {suggestions
          .filter((v) => v.id !== activeVideo.id)
          .map((video) => (
            <VideoThumb
              key={video.id}
              video={video}
              compact
              onClick={openVideo}
            />
          ))}
      </aside>
    </main>
  );
}

function ShortsPage({ goBack, theme, setTheme }) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const move = (delta) => {
    const next = Math.max(0, Math.min(shorts.length - 1, index + delta));
    setIndex(next);
    containerRef.current?.children[next]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };
  const observer = useRef(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          const newIndex = Number(visibleEntry.target.dataset.index);
          if (!isNaN(newIndex)) {
            setIndex(newIndex);
          }
        }
      },
      { threshold: 0.7 },
    );

    const reels = containerRef.current?.children;
    if (reels) {
      Array.from(reels).forEach((reel) => observer.current.observe(reel));
    }

    return () => observer.current?.disconnect();
  }, [shorts.length]);

  return (
    <main className="ytx-shorts-page">
      <button
        className="ytx-back ytx-shorts-back"
        onClick={goBack}
        type="button"
      >
        <ArrowLeft size={20} /> Back
      </button>
      <button
        className="ytx-icon ytx-shorts-theme"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        type="button"
      >
        {theme === "dark" ? <Sun /> : <Moon />}
      </button>
      <div className="ytx-shorts-list" ref={containerRef}>
        {shorts.map((short, i) => (
          <section className="ytx-reel" key={short.id} data-index={i}>
            <div className="ytx-reel-phone">
              {Math.abs(i - index) <= 1 ? (
                <iframe
                  src={getEmbedUrl(short, i === index)}
                  title={short.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <img src={short.thumb} alt={short.title} loading="lazy" />
              )}
              <div className="ytx-reel-overlay">
                <h2>{short.title}</h2>
                <p>
                  {short.views} ΓÇó @
                  {short.isAd ? "sponsored" : "dushyantpowertools"}
                </p>
              </div>
            </div>
            <div className="ytx-reel-actions">
              <button>
                <ThumbsUp />
              </button>
              <span>12K</span>
              <button>
                <ThumbsDown />
              </button>
              <button>
                <Share2 />
              </button>
              <button>
                <MoreVertical />
              </button>
            </div>
          </section>
        ))}
      </div>
      <div className="ytx-reel-nav">
        <button disabled={index === 0} onClick={() => move(-1)}>
          <ChevronUp />
        </button>
        <button disabled={index === shorts.length - 1} onClick={() => move(1)}>
          <ChevronDown />
        </button>
      </div>
      <p className="ytx-reel-count">
        {index + 1} / {shorts.length}
      </p>
    </main>
  );
}

export default function VideoCommunity() {
  const css = `
.ytx-page{--bg:#fff;--text:#0f0f0f;--muted:#606060;--line:rgba(0,0,0,.12);--chip:rgba(0,0,0,.05);--chip2:rgba(0,0,0,.1);--panel:#fff;--raised:#f2f2f2;--red:#ff0033;min-height:100vh;background:var(--bg);color:var(--text);font-family:Roboto,Arial,Inter,sans-serif}.ytx-watch-actions button.is-active{background:var(--chip2);color:var(--red)}
.ytx-dark{--bg:#0f0f0f;--text:#f1f1f1;--muted:#aaa;--line:rgba(255,255,255,.16);--chip:rgba(255,255,255,.1);--chip2:rgba(255,255,255,.18);--panel:#0f0f0f;--raised:#272727}
.ytx-page *{box-sizing:border-box}.ytx-page button{font-family:inherit}.ytx-header{position:sticky;top:0;z-index:40;height:56px;display:grid;grid-template-columns:240px minmax(260px,640px) 1fr;align-items:center;gap:18px;padding:0 24px;background:var(--bg);border-bottom:1px solid var(--line)}
.ytx-left,.ytx-actions{display:flex;align-items:center;gap:12px}.ytx-actions{justify-content:flex-end}.ytx-logo-btn{border:0;background:transparent;color:inherit}.ytx-logo{display:flex;align-items:center;gap:8px}.ytx-logo>span{width:31px;height:31px;display:grid;place-items:center;color:#fff;background:#0f0f0f;border:2px solid var(--red);clip-path:polygon(50% 0,92% 18%,83% 76%,50% 100%,17% 76%,8% 18%)}.ytx-logo strong{display:block;font-size:15px;line-height:1;font-weight:900}.ytx-logo em{display:block;color:var(--red);font-size:11px;line-height:1;font-style:normal;font-weight:900}
.ytx-search{height:40px;display:grid;grid-template-columns:1fr 64px;border:1px solid var(--line);border-radius:999px;overflow:hidden}.ytx-search input{min-width:0;border:0;outline:0;padding:0 18px;background:transparent;color:var(--text);font-size:14px}.ytx-search button{border:0;border-left:1px solid var(--line);background:var(--raised);color:var(--text)}
.ytx-icon,.ytx-avatar{width:40px;height:40px;display:grid;place-items:center;border:0;border-radius:50%;background:transparent;color:var(--text);position:relative}.ytx-icon:hover,.ytx-avatar:hover{background:var(--chip2)}.ytx-icon i{position:absolute;top:2px;right:0;min-width:18px;height:18px;display:grid;place-items:center;border-radius:50%;color:#fff;background:var(--red);font-size:11px;font-style:normal}.ytx-avatar{color:#fff;background:linear-gradient(135deg,#2563eb,#ef4444)}.ytx-create{height:36px;display:inline-flex;align-items:center;gap:7px;border:0;border-radius:999px;padding:0 15px;background:var(--chip);color:var(--text);font-weight:600}
.ytx-shell{display:grid;grid-template-columns:240px minmax(0,1fr)}.ytx-sidebar{position:sticky;top:56px;height:calc(100vh - 56px);overflow-y:auto;padding:12px;border-right:1px solid var(--line);background:var(--bg)}.ytx-sidebar button{width:100%;height:40px;display:flex;align-items:center;gap:22px;border:0;border-radius:10px;padding:0 12px;background:transparent;color:var(--text);font-size:14px;text-align:left}.ytx-sidebar button.is-active,.ytx-sidebar button:hover{background:var(--chip2);font-weight:600}.ytx-sidebar b{width:24px;height:24px;display:grid;place-items:center;border-radius:50%;background:var(--red);color:#fff}.ytx-sidebar h3{margin:0 0 8px 12px;font-size:14px}.ytx-divider{height:1px;margin:12px 0;background:var(--line)}
.ytx-feed{min-width:0;padding:12px 24px 48px}.ytx-chips{position:sticky;top:56px;z-index:20;display:flex;gap:10px;overflow-x:auto;padding:8px 0 14px;background:var(--bg)}.ytx-chips button{height:32px;border:0;border-radius:8px;padding:0 13px;white-space:nowrap;background:var(--chip);color:var(--text);font-weight:700}.ytx-chips .is-active{color:var(--bg);background:var(--text)}.ytx-grid{display:grid;grid-template-columns:repeat(4,minmax(260px,1fr));gap:34px 16px}
.ytx-card{min-width:0;cursor:pointer}.ytx-thumb{position:relative;overflow:hidden;aspect-ratio:16/9;border-radius:12px;background:#111}.ytx-thumb img{width:100%;height:100%;object-fit:cover;display:block}.ytx-thumb span,.ytx-short-lockup span{position:absolute;right:6px;bottom:6px;padding:2px 5px;border-radius:4px;background:rgba(0,0,0,.82);color:#fff;font-size:12px;font-weight:700}.ytx-meta{display:grid;grid-template-columns:36px minmax(0,1fr);gap:10px;margin-top:10px}.ytx-meta b{width:36px;height:36px;display:grid;place-items:center;border-radius:50%;background:var(--red);color:#fff}.ytx-meta h3{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin:0 0 4px;font-size:15px;line-height:1.35}.ytx-meta p,.ytx-meta small{display:flex;align-items:center;gap:4px;margin:0;color:var(--muted);font-size:13px;line-height:1.35}
.ytx-ad-art{aspect-ratio:16/9;border-radius:12px;background:#f1f1f1;display:grid;place-items:center;padding:28px;color:#111}.ytx-ad-art h2{max-width:360px;text-align:center;font-size:32px;line-height:1.06;font-weight:900}.ytx-ad-buttons{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}.ytx-ad-buttons button{height:36px;border:0;border-radius:999px;background:var(--chip2);color:var(--text);font-weight:700}
.ytx-shelf{margin-top:36px}.ytx-shelf>div:first-child{display:flex;justify-content:space-between;align-items:center}.ytx-shelf h2{margin:0 0 14px}.ytx-shelf button{border:0;background:transparent;color:#065fd4;font-weight:700}.ytx-shorts-strip{display:grid;grid-template-columns:repeat(8,minmax(120px,1fr));gap:12px}.ytx-short-lockup{text-align:left;border:0;background:transparent;color:var(--text);padding:0}.ytx-short-lockup img{width:100%;aspect-ratio:9/16;object-fit:cover;border-radius:12px;background:#111}.ytx-short-lockup h3{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin:8px 0 3px;font-size:14px}.ytx-short-lockup p{margin:0;color:var(--muted)}
.ytx-watch{display:grid;grid-template-columns:minmax(0,1fr)402px;gap:24px;max-width:1760px;margin:0 auto;padding:24px}.ytx-back{height:36px;display:inline-flex;align-items:center;gap:8px;border:0;border-radius:999px;padding:0 13px;margin-bottom:10px;background:var(--chip);color:var(--text);font-weight:700}.ytx-player{overflow:hidden;aspect-ratio:16/9;border-radius:12px;background:#000}.ytx-player iframe{width:100%;height:100%;border:0}.ytx-watch h1{margin:14px 0 12px;font-size:20px}.ytx-owner-row{display:flex;align-items:center;gap:12px;flex-wrap:wrap}.ytx-owner{display:flex;align-items:center;gap:12px;margin-right:auto}.ytx-owner>b{width:42px;height:42px;display:grid;place-items:center;border-radius:50%;color:#fff;background:var(--red)}.ytx-owner strong{display:flex;align-items:center;gap:5px}.ytx-owner small{color:var(--muted)}.ytx-subscribe{height:36px;border:0;border-radius:999px;padding:0 18px;color:var(--bg);background:var(--text);font-weight:700}.ytx-watch-actions{display:flex;gap:8px;flex-wrap:wrap}.ytx-watch-actions button{height:36px;display:inline-flex;align-items:center;gap:7px;border:0;border-radius:999px;padding:0 13px;background:var(--chip);color:var(--text);font-weight:700}.ytx-description{margin-top:14px;padding:12px;border-radius:12px;background:var(--chip);font-size:14px}.ytx-description p:last-child{color:#065fd4;font-weight:700}.ytx-watch-side{display:grid;gap:8px;align-content:start}
.ytx-compact{display:grid;grid-template-columns:168px minmax(0,1fr)24px;gap:8px;cursor:pointer}.ytx-compact .ytx-thumb{border-radius:8px}.ytx-compact .ytx-meta{display:block;margin:0}.ytx-compact h3{font-size:14px}.ytx-compact button{border:0;background:transparent;color:var(--text)}
.ytx-comments{margin-top:30px;border-top:1px solid var(--line);padding-top:18px}.ytx-comments h2{margin:0 0 18px}.ytx-comments form{display:grid;grid-template-columns:36px 1fr 40px;gap:10px;align-items:center;margin-bottom:24px}.ytx-comments form span,.ytx-comments article>span{width:36px;height:36px;display:grid;place-items:center;border-radius:50%;color:#fff;background:#2563eb;font-weight:700}.ytx-comments input{height:38px;border:0;border-bottom:1px solid var(--line);background:transparent;color:var(--text);outline:0}.ytx-comments form button{border:0;border-radius:50%;background:var(--chip);color:var(--text)}.ytx-comments article{display:grid;grid-template-columns:36px 1fr 24px;gap:12px;margin-top:18px}.ytx-comments article p{margin:4px 0 8px}.ytx-comments article button{border:0;background:transparent;color:var(--muted);margin-right:12px}
.ytx-shorts-page{min-height:100vh;background:#0f0f0f;color:#fff;position:relative;overflow:hidden}.ytx-shorts-back{position:fixed;left:22px;top:18px;z-index:20;background:rgba(255,255,255,.12);color:#fff}.ytx-shorts-theme{position:fixed;right:22px;top:18px;z-index:20;color:#fff;background:rgba(255,255,255,.12)}.ytx-shorts-list{height:100vh;overflow-y:auto;scroll-snap-type:y mandatory;touch-action:pan-y;overscroll-behavior:contain;-webkit-overflow-scrolling:touch}.ytx-reel{height:100vh;display:flex;align-items:center;justify-content:center;gap:18px;scroll-snap-align:start}.ytx-reel-phone{position:relative;width:min(430px,78vw);height:min(86vh,780px);overflow:hidden;border-radius:12px;background:#000;box-shadow:0 30px 90px rgba(0,0,0,.45)}.ytx-reel-phone iframe,.ytx-reel-phone img{width:100%;height:100%;border:0;object-fit:cover}.ytx-reel-overlay{position:absolute;left:18px;right:18px;bottom:18px;text-shadow:0 2px 12px #000}.ytx-reel-overlay h2{font-size:18px}.ytx-reel-actions{display:grid;gap:8px;text-align:center}.ytx-reel-actions button,.ytx-reel-nav button{width:52px;height:52px;border:0;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.14);color:#fff}.ytx-reel-nav{position:fixed;right:24px;top:50%;display:grid;gap:16px;transform:translateY(-50%)}.ytx-reel-count{position:fixed;right:24px;bottom:18px;color:#aaa}
.ytx-scrim{position:fixed;inset:0;background:rgba(0,0,0,.5);opacity:0;pointer-events:none;transition:opacity 200ms;z-index:80}.ytx-scrim.visible{opacity:1;pointer-events:auto}.ytx-drawer{position:fixed;left:0;top:0;bottom:0;width:280px;background:var(--bg);color:var(--text);transform:translateX(-105%);transition:transform 200ms;z-index:90;box-shadow:0 0 40px rgba(0,0,0,.25)}.ytx-drawer.visible{transform:translateX(0)}.ytx-drawer-head{height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 12px}.ytx-drawer .ytx-sidebar{display:block;position:static;height:calc(100vh - 56px);border:0}
@media(max-width:1280px){.ytx-header{grid-template-columns:220px 1fr auto}.ytx-shell{grid-template-columns:72px 1fr}.ytx-sidebar{padding:8px 4px}.ytx-sidebar button{justify-content:center;gap:0;padding:0}.ytx-sidebar button span,.ytx-sidebar h3{display:none}.ytx-grid{grid-template-columns:repeat(3,minmax(240px,1fr))}.ytx-watch{grid-template-columns:minmax(0,1fr)360px}.ytx-compact{grid-template-columns:150px 1fr 20px}}
@media(max-width:980px){.ytx-header{grid-template-columns:auto 1fr auto;padding:0 12px}.ytx-create,.ytx-hide-sm{display:none}.ytx-shell{grid-template-columns:1fr}.ytx-sidebar{display:none}.ytx-feed{padding:10px 12px 34px}.ytx-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.ytx-watch{grid-template-columns:1fr;max-width:860px}.ytx-watch-side{order:3}.ytx-shorts-strip{grid-template-columns:repeat(4,1fr)}}
@media(max-width:640px){.ytx-header{grid-template-columns:1fr auto;height:auto;min-height:56px;padding:8px 10px}.ytx-search{grid-column:1/-1;order:3}.ytx-hide-xs{display:none}.ytx-grid{grid-template-columns:1fr}.ytx-watch{padding:12px}.ytx-player{margin-inline:-12px;border-radius:0}.ytx-watch-actions{overflow-x:auto;flex-wrap:nowrap}.ytx-watch-actions button{flex:0 0 auto}.ytx-compact{grid-template-columns:132px 1fr 20px}.ytx-shorts-strip{grid-template-columns:repeat(2,1fr)}.ytx-reel{gap:8px}.ytx-reel-actions{position:absolute;right:10px;bottom:80px}.ytx-reel-nav{right:12px}.ytx-reel-phone{width:100vw;height:100vh;border-radius:0}}
`;
  const [theme, setTheme] = useState("light");
  const [page, setPage] = useState("home");
  const [shortsList, setShortsList] = useState(() => shuffleArray(shorts));
  const [activeVideo, setActiveVideo] = useState(() => shuffleArray(videos)[0]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [videoList, setVideoList] = useState(() => shuffleArray(videos));
  const [selectedChip, setSelectedChip] = useState("All");
  const [displayCount, setDisplayCount] = useState(12);
  const observerRef = useRef(null);

  const filteredVideos = useMemo(
    () => filterVideos(videoList, selectedChip),
    [videoList, selectedChip],
  );

  const videosToDisplay = useMemo(
    () => filteredVideos.slice(0, displayCount),
    [filteredVideos, displayCount],
  );

  const [comments, setComments] = useState([
    {
      name: "Vishal Tools",
      text: "Great review, stream playback is smooth.",
      time: "2 days ago",
    },
    {
      name: "Arjun Mehra",
      text: "Readable streams wala part mast hai.",
      time: "1 day ago",
    },
    {
      name: "Dushyant Power Tools",
      text: "Next video mein piping pipeline explain karenge.",
      time: "6 hours ago",
    },
  ]);

  useEffect(() => {
    setDisplayCount(12); // Reset count when filter changes
  }, [selectedChip]);

  useEffect(() => {
    if (page === "shorts") setShortsList(shuffleArray(shorts));
  }, [page]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/videos`);
        if (!response.ok) throw new Error("Failed to load videos");
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const fallbackByYoutube = new Map(
            videos.map((item) => [item.youtubeId, item]),
          );
          const mappedVideos = data.map((video, index) => {
            const youtubeId = video.youtubeUrl
              ? video.youtubeUrl.split("v=")[1] || video.youtubeUrl
              : video.youtubeId || "";
            const fallback = fallbackByYoutube.get(youtubeId);
            return {
              id: video.id || fallback?.id || `v-${index + 1}`,
              youtubeId,
              url:
                video.youtubeUrl ||
                fallback?.url ||
                `https://www.youtube.com/watch?v=${youtubeId}`,
              title: video.title || fallback?.title || "Video",
              channel:
                video.channelId || fallback?.channel || "Dushyant Power Tools",
              tags: fallback?.tags || [],
              views:
                video.views !== undefined
                  ? `${video.views.toLocaleString()} views`
                  : fallback?.views || "1.1K views",
              age: video.createdAt
                ? `${Math.max(1, Math.floor((Date.now() - new Date(video.createdAt).getTime()) / (1000 * 60 * 60 * 24)))} days ago`
                : fallback?.age || "1 day ago",
              duration:
                video.duration ||
                fallback?.duration ||
                getFallbackDuration(index),
              thumb: video.poster || video.thumb || fallback?.thumb,
              localFallback: fallback?.localFallback || workshopImage,
              description:
                video.description ||
                fallback?.description ||
                "Stream-friendly video playback using one active player at a time, so the browser stays smooth.",
              likes: video.likes ?? fallback?.likes ?? 1200 + index * 85,
              userAction: fallback?.userAction ?? null,
              watched: fallback?.watched ?? false,
              newToYou: fallback?.newToYou ?? false,
              uploadedAt:
                fallback?.uploadedAt || Date.now() - index * 1000 * 60 * 60 * 4,
            };
          });
          const shuffledVideos = shuffleArray(
            mappedVideos.length ? mappedVideos : videos,
          );
          setVideoList(shuffledVideos);
          setActiveVideo((prev) =>
            shuffledVideos.find((item) => item.id === prev.id)
              ? prev
              : shuffledVideos[0] || videos[0],
          );
        }
      } catch (error) {
        console.warn("VideoCommunity: using fallback videos", error);
      }
    };

    fetchVideos();
  }, []);

  const openVideo = (video) => {
    setActiveVideo(video);
    setPage("watch");
    window.scrollTo(0, 0);
  };
  const goBack = () => {
    setPage("home");
    window.scrollTo(0, 0);
  };

  const handleVideoAction = (videoId, action) => {
    setVideoList((currentVideos) =>
      currentVideos.map((video) => {
        if (video.id === videoId) {
          const wasLiked = video.userAction === "like";
          const wasDisliked = video.userAction === "dislike";
          let newLikes = video.likes ?? 0;

          if (action === "like") {
            newLikes = wasLiked ? newLikes - 1 : newLikes + 1;
            if (wasDisliked) newLikes += 1; // Or handle as you see fit
          } else if (action === "dislike" && wasLiked) {
            newLikes = newLikes - 1;
          }

          const newUserAction = video.userAction === action ? null : action;
          return { ...video, likes: newLikes, userAction: newUserAction };
        }
        return video;
      }),
    );
  };

  const loadMoreRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && displayCount < filteredVideos.length) {
          setDisplayCount((prev) => prev + 8); // Load 8 more videos
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [displayCount, filteredVideos.length],
  );

  return (
    <div className={`ytx-page ${theme === "dark" ? "ytx-dark" : "ytx-light"}`}>
      <style>{css}</style>
      {page !== "shorts" && (
        <Header
          theme={theme}
          setTheme={setTheme}
          setPage={setPage}
          setDrawerOpen={setDrawerOpen}
        />
      )}
      {page !== "shorts" && (
        <div className="ytx-shell">
          <Sidebar page={page} setPage={setPage} />
          {page === "home" && (
            <HomePage
              videos={videosToDisplay}
              openVideo={openVideo}
              setPage={setPage}
              selectedChip={selectedChip}
              setSelectedChip={setSelectedChip}
              loadMore={loadMoreRef}
            />
          )}
          {page === "watch" && (
            <WatchPage
              activeVideo={activeVideo}
              openVideo={openVideo}
              comments={comments}
              setComments={setComments}
              goBack={goBack}
              suggestions={videoList}
              onVideoAction={handleVideoAction}
            />
          )}
        </div>
      )}
      {page === "shorts" && (
        <ShortsPage
          goBack={goBack}
          theme={theme}
          setTheme={setTheme}
          shorts={shortsList}
        />
      )}
      <Drawer open={drawerOpen} setOpen={setDrawerOpen} setPage={setPage} />
    </div>
  );
}
