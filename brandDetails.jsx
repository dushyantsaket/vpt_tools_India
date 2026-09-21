import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Search, ShoppingCart, Heart, CheckCircle2, Phone } from "lucide-react";
import { BRANDS, BOSCH_PRODUCTS, BRAND_VIDEOS } from "../data/brandData";

const FILTER_TABS = [
  "All Brands",
  "Power Tools",
  "Accessories",
  "Industrial",
  "Available",
];

const SHOWCASE_IMAGES = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6VKPU6zCjf3_L1vxXqOdqpfuIdx6JZF2lLM0jTEzj_Q&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgZyoLkR9sApELPIyRN_iQSLGM6xJkdiHU3zGsNkPxlA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHb7o8ukdzTU_v-83qdCX_cU3WiiQed-i8fQXtJrlucg&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQonJSdDI4uBFcP6EuHb_XrXt44xfMjiWEHZ1lCMpbjsA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGB576jPa28LUnsAqAx4_EsaA17VnONwUIASUQ4ndF2A&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdBNW9nocw7inm3T5Ve3aM5lmSI4aqxwh2dIBrWlSVjQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqoIhPQ-f1pkZI6RR6o83rplF4RSo2ITfnIK45R5zKhQ&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_rNrbC_twhBatuz54ww-OoPDNIYxImFDcDsA-LrrQkQ&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5VB02qmAgMlyRyub0F-tnSBp4h5CdxXuWFn0fv2A6oA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMZ1eHWqSWWWrA5mtUSPsAJyEK8A858DhsZ6AW30ym6A&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFPv981ngvHUD7OSrV_nx6Hx-OKh81WmFNQSmUiDgu2A&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSihIpLWlqYspFm4pj1mmtcQ9wRhfhBS_CFc6-5lCsMA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZe-i8ZSJO6kwm3PR4c3XiTH4JEm78Oh_pO4GrwZqsLA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGPEHlOIoRSBtyyiJ2Xdytp4_HCk5srkTjo7q6_8C3BA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfme-u62gzZfFqfrDIud7iS5y7MhaDM6ZlvcOSJ8NZIw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7nBbFIWBbAxvyAiJbo0l4ZrfROs9tw8U04hO_yDGRew&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcMhiOZS1WfHooyujFPdagKGuj35H7Nb4KIqi-l180uQ&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTczXXdQfxls_gX878n5wv1LdKifbrR4lEJZl3MgtQocQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDGKhCxdxFyLmCUYF6Jqfc34XINNlDT7lDGa9HZDp_Sw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThsjx2dVvZRLf6rUYno1X39Ruoi748jLemBn5SD1tEPw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY32fuKsKxQKaJYn3aVd77KVHnUW-__PzYfF5ILJVDUw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROFq2WF4PjlGIQorvxbMyzhPyF0kg1ArORkc1ULxGvkQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0-eYMktomIOQRHisQtptUuEzaMzHTwj4sDySmo9Gqfw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-I_DLzooZl8hl0bZHLHHZ6xEgbaEj-7e1Mmn_13T6-Q&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ83l_ADKXU4ogvbq2nAa-hoLn5T74HpuiWL9gtiZpgA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDouwAtGienpVbBVl78jkglNoBJtYxBd-gSvRq-BOb6g&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgDRigTNdLxz5nNugSeGeb8ePdtp68OBfEkf3NQSGhfg&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNsz_uVdGt1Z4O6vIv2AlDjqXxk7MoC9OMci083jCdng&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL2OfvaEscmzp5hdrPa92oVTTttk6oHeEj03p1XTslMQ&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmWH27YWyj3LvKZ-3TmwfcS3bQ7KXebLcy19FQEyO5ag&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA_4SF0q24nLdESver2_qlLKhTNraHo_W_EjNffaPCxw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx6Ui1slzwh_SfP-4Bk2ot02ikznkFYCMFVimhHHbF6w&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWFstHI1nNH2BZ7vQCpC5zxAgCoUN37-waPFySDbzpIw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5ISrAkUsSqG_aPpNUAiYnEQ6f14UeJwfWdN0ZPDd7XA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU1UBo-t7b6gOzLKQWIfrTxYEoO9rOYV-q0n9fw4dCpA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS17eJ1HCng9NVqz8UbbHeBKzddtKxSuFF7xl5RUJ9wVw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTKbcbvYXVcfxsJFMbM_a3mALWQI4lg5qa-QvPFO7sWg&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9tT9HnAaTwbQaVLEXoasY4ev1FDLSHxflo0zdJiC-lQ&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Paa69eUjHFWH3EJTtcUbu5WarC8jhP8xtUI5vwZAGQ&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTySI2Jr7eA_3oEVDz0VAF_pzoqgdyI1CotG6jjk4sQQw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGuaO8feZxg5t5AHuY7AegVIDgZy1pedGmnIVkqmMWpg&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKVwVRtpg53mOwEH3xGouqjf-WyZRbYG8aHp3T_h8f7A&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFAIacJ4p1UJcOFU7GL3-apySsZo4QtjphvXOuoxeEMA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSIK84ZoTc3YSU_JdNWUrxWeogYCfIM4NF257qDkKqcA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4XKGPWhAaFC_nFRlAzKAaOAfCv9ABid336BQFcfbrKQ&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Dmp0t3SGbkYGDI49hHa74cxvWGt1HzOlBqthoD4Ozg&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVAI98FrsJXhNUyfN_Ingdfx2q0R3W14XzRXhz1egLIA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfr7yH_FBQ0Ia0q4OJ2qhwEru6dyNFJprtW53T_vPuEw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1KMCAwudlszZ6D6ROCUZRw3tTqzsxWmMnwhSCiqCeFA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTQU3hoX6GhkLHX16g14GoIXvSJTNPovvffCWyxAUHCw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkAyw8u7J-1ouAUGSWfhKIeAJf6YJaDeUQtk6L5ARCnA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ35uC8O1w3Sqv54-zm4VEpyAkrObDJiIj39baJs1APw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtg8Oft-NpJvJ0mlASancmZF_HgJ4gONj6m0bRKjNYDQ&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK3AkS5pUcyfUy4ltJV_cfGcX1dnG0dpQvYvaiiKQxsQ&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsUgq5liBoow_Ih91pJyrgwsEhVuvYc24luw5MdaGsZg&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQslmrS5fz-YbKfmQPXiD48klpMaWXUHSvvQJ7fUD_qsw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNN0HHOklTenCMUcWs4EXFKdbrYxWRFcoV2w_jfO67wQ&s=10",
  "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOgsBqr8gNINP02X2N0BszHAARqTOoJhKwCJWSbR--TA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTuyy2pjK-fw4F60t6ok-wuQ9N_duuVmipLV0P5TqBbA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsMQ9V7e-2vuqTP65J6iOA63xhtMZTGzVSw-yEGIEX8A&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROiy76SWtzQTT8mizopE-IXySkkVFyK8Uu7OWHqcEkuA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm8Cb2QO6UNKMKZJu_zlg9RNTQC9J89z2mc33KaWMNTg&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4fwYE1APW_SA1-yh115zbTOOSpt-LWwBM2XuizUR_g&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx_Yq0f4G9u06aB-qLqLpXJCrswUsQBQNwAX_IiWJ_Ug&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0FAY5zn_6MuO9eUY9bMhPDcyIsux9h8_M83JTdC_LIg&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpZNmWuXXkb68kH05fUw_MdGublQ5HDC_JYrkuAGQpiQ&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvCvQcN2O6VpklQN3S3kfa3YJppGw-eqE-q5pw7T4IMQ&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvJXc6ct4e3py8aflGLnn0TjUekWzr6xUoMyjLpR97Ew&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR2i7ugKNZSkFQ7nlYKEBBD5ubkuJ3_ZwJDAVwPwJKpg&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpxgvMyilXOZcj6-QQL5vj2MT0KwmAzjUKBOlzAz0oOA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT25FVBCnqurMIDvYJFmn5xzfE3ATJUhNi1DOvvbnZjWw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqDU_0sPFfykulCGdN8MeB_ap6x7Gxr-LRwdmJ42qN1A&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG5O9QwbONwOknCgAYTkGGgZBKleBLl4jkniElQ2rFHQ&s=10",
  "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&auto=format&fit=crop&q=80",
];

const BRAND_RATINGS = {
  bosch: {
    score: "4.8",
    reviews: "1200+",
    quality: "98%",
    delivery: "95%",
    support: "96%",
  },
  "bsc-power": {
    score: "4.6",
    reviews: "680+",
    quality: "95%",
    delivery: "93%",
    support: "94%",
  },
  makita: {
    score: "4.7",
    reviews: "980+",
    quality: "97%",
    delivery: "94%",
    support: "95%",
  },
  dewalt: {
    score: "4.8",
    reviews: "870+",
    quality: "98%",
    delivery: "96%",
    support: "95%",
  },
};

// Add or replace images in the matching brand section below.
const NCH_SHOWCASE_IMAGES = [
  "https://bscpowertools.com/wp-content/uploads/2025/07/NCH-E140-ELECTRIC-CHAINSAW-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2025/07/NCH-E180-CHAINSAW-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/04/NCH-bars-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/04/NCH-H590-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/02/781-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/06/NS-750-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/520earth-Auger-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/NCH-H680-EARTH-AUGER-500x500.png",
  "https://bscpowertools.com/wp-content/uploads/2024/02/NCH-WP-170F-Main-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/02/NCH-H2600-500x500.jpg",
];
const BOSCH_SHOWCASE_IMAGES = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80",
];
const BSC_POWER_SHOWCASE_IMAGES = [
  "https://bscpowertools.com/wp-content/uploads/2024/03/BSC-CD-10H21V-500x500.png",
  "https://bscpowertools.com/wp-content/uploads/2026/01/electric-trimmer-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/4110-1-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/4125-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/BSC-626H-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/7105-1-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/BSC-CD-10H-1-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2025/02/ringsaw-2-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/08/Untitled-1-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/ED10X-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/ED-1301RE-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/Bsc-ED13EID-500x500.png",
  "https://bscpowertools.com/wp-content/uploads/2024/03/Electric-Mixer-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/ER12-1-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/Heat-gun-A-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/HPW-1700-PRESSURE-WASHER-B-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/MC-4SAB-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/BSC-MMA-200-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/BSC-MMA-300-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/SD10L-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/BSC-VR15-A-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/BSC-VR20H-500x500.png",
  "https://bscpowertools.com/wp-content/uploads/2024/03/DEMOLITION-HAMMER-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/Untitled-1-2-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/BSC-POWER-1085-DEMOLITION-HAMMER-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/BSC-3710-Jigsaw-A-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/622-1-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/angle-Grinder-8100-C-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/07/8100S-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/09/BSC-8110-3-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/07/BSC-POWER-8200P-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/09/BSC-8200PS-1-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/BSC-AG-8500-1-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/GRINDER-8800-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/10/BSC-8140-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/10/BSC-8700-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/9280-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/COM-9280-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/DIE-GRINDER-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/DH-11E-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/DH-7E-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/BLOWER-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/MS-255-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2024/03/PL-82A-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2025/08/ROTARY-HAMMER-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2025/08/BSC-RH-642-1-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2026/02/MC4140-500x500.jpg",
  "https://bscpowertools.com/wp-content/uploads/2026/02/4170-500x500.jpg",
];
const AKARI_SHOWCASE_IMAGES = [
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop&q=80",
];
const SAW_MASTER_SHOWCASE_IMAGES = [
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&auto=format&fit=crop&q=80",
];
const YURI_SHOWCASE_IMAGES = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgZyoLkR9sApELPIyRN_iQSLGM6xJkdiHU3zGsNkPxlA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHb7o8ukdzTU_v-83qdCX_cU3WiiQed-i8fQXtJrlucg&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQonJSdDI4uBFcP6EuHb_XrXt44xfMjiWEHZ1lCMpbjsA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGB576jPa28LUnsAqAx4_EsaA17VnONwUIASUQ4ndF2A&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdBNW9nocw7inm3T5Ve3aM5lmSI4aqxwh2dIBrWlSVjQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqoIhPQ-f1pkZI6RR6o83rplF4RSo2ITfnIK45R5zKhQ&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_rNrbC_twhBatuz54ww-OoPDNIYxImFDcDsA-LrrQkQ&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5VB02qmAgMlyRyub0F-tnSBp4h5CdxXuWFn0fv2A6oA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMZ1eHWqSWWWrA5mtUSPsAJyEK8A858DhsZ6AW30ym6A&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFPv981ngvHUD7OSrV_nx6Hx-OKh81WmFNQSmUiDgu2A&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSihIpLWlqYspFm4pj1mmtcQ9wRhfhBS_CFc6-5lCsMA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZe-i8ZSJO6kwm3PR4c3XiTH4JEm78Oh_pO4GrwZqsLA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGPEHlOIoRSBtyyiJ2Xdytp4_HCk5srkTjo7q6_8C3BA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfme-u62gzZfFqfrDIud7iS5y7MhaDM6ZlvcOSJ8NZIw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7nBbFIWBbAxvyAiJbo0l4ZrfROs9tw8U04hO_yDGRew&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcMhiOZS1WfHooyujFPdagKGuj35H7Nb4KIqi-l180uQ&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTczXXdQfxls_gX878n5wv1LdKifbrR4lEJZl3MgtQocQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDGKhCxdxFyLmCUYF6Jqfc34XINNlDT7lDGa9HZDp_Sw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThsjx2dVvZRLf6rUYno1X39Ruoi748jLemBn5SD1tEPw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY32fuKsKxQKaJYn3aVd77KVHnUW-__PzYfF5ILJVDUw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROFq2WF4PjlGIQorvxbMyzhPyF0kg1ArORkc1ULxGvkQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0-eYMktomIOQRHisQtptUuEzaMzHTwj4sDySmo9Gqfw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-I_DLzooZl8hl0bZHLHHZ6xEgbaEj-7e1Mmn_13T6-Q&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ83l_ADKXU4ogvbq2nAa-hoLn5T74HpuiWL9gtiZpgA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDouwAtGienpVbBVl78jkglNoBJtYxBd-gSvRq-BOb6g&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgDRigTNdLxz5nNugSeGeb8ePdtp68OBfEkf3NQSGhfg&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNsz_uVdGt1Z4O6vIv2AlDjqXxk7MoC9OMci083jCdng&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL2OfvaEscmzp5hdrPa92oVTTttk6oHeEj03p1XTslMQ&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmWH27YWyj3LvKZ-3TmwfcS3bQ7KXebLcy19FQEyO5ag&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA_4SF0q24nLdESver2_qlLKhTNraHo_W_EjNffaPCxw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx6Ui1slzwh_SfP-4Bk2ot02ikznkFYCMFVimhHHbF6w&s=10",
];
const GC_POWER_SHOWCASE_IMAGES = [
  "//www.yurigroup.com/cdn/shop/files/Dayuri_DA_-_AG5000_Angle_Grinder.png?v=1764792269",
  "//www.yurigroup.com/cdn/shop/files/AngleGrinderDA-AG5001.png?v=1763493981",
  "//www.yurigroup.com/cdn/shop/files/AngleGrinderDA-AG5002_c0e3ae51-577b-4da1-948c-84526bdce08e.png?v=1763494045",
  "//www.yurigroup.com/cdn/shop/files/ANGLEGRINDERDA-AG5012_1_04a3b190-a24e-46d7-a30c-27fc9fe51201.png?v=1749740945",
  "//www.yurigroup.com/cdn/shop/files/Dayuri_DA_-_AG5013_Angle_Grinder_100mm_125mm.png?v=1773654053",
  "//www.yurigroup.com/cdn/shop/files/AG5014.png?v=1763494081",
  "//www.yurigroup.com/cdn/shop/files/Dayuri_DA_-_AG5015_Angle_Grinder.png?v=1779297676",
  "//www.yurigroup.com/cdn/shop/files/Yuri_DA_-_DG5016_Die_Grinder.png?v=1764099955",
  "//www.yurigroup.com/cdn/shop/files/Dayuri_YSS125B_125mm_Straight_Grinder.png?v=1750017680",
  "//www.yurigroup.com/cdn/shop/files/Dayuri_DA_-_MC5025_125MM_Marble_Cutter.png?v=1758976654",
  "//www.yurigroup.com/cdn/shop/files/Dayuri_DA_-_MC5026_125MM_Marble_Cutter.png?v=1758981424",
  "//www.yurigroup.com/cdn/shop/files/Dayuri_DA_-_MC5027_125MM_Marble_Cutter.png?v=1758981708",
  "//www.yurigroup.com/cdn/shop/files/Dayuri_DA_-_WC5031_Wall_Chaser.png?v=1779301568",
  "//www.yurigroup.com/cdn/shop/files/ConcreteCutterDA-CC5032.png?v=1763500221",
  "//www.yurigroup.com/cdn/shop/files/Dayuri_DA_-_RH5040_Rotary_Hammer.png?v=1758977393",
  "//www.yurigroup.com/cdn/shop/files/Dayuri_DA_-_RH5041_Rotary_Hammer.png?v=1758977648",
];
const KEIL_SHOWCASE_IMAGES = [
  "https://keilchainsaw.com/wp-content/uploads/2020/04/IMG_6517-300x300.jpg",
  "https://keilchainsaw.com/wp-content/uploads/2020/04/KL5820-1-scaled-1-300x200.jpg",
  "https://keilchainsaw.com/wp-content/uploads/2022/03/58101-300x251.jpg",
  "https://keilchainsaw.com/wp-content/uploads/2021/01/KL5830-scaled-1-300x200.jpg",
  "https://keilchainsaw.com/wp-content/uploads/2020/04/WhatsApp-Image-2020-12-02-at-5.02.24-PM-300x200.jpeg",
  "https://keilchainsaw.com/wp-content/uploads/2020/04/IMG_6521-300x300.jpg",
  "https://keilchainsaw.com/wp-content/uploads/2023/12/u9JNPi9SIDcJ09e4J2K2pv-lFSVyXVNwm3x_M-kKqM0_plaintext_638320147776809256-300x218.jpg",
  "https://keilchainsaw.com/wp-content/uploads/2020/04/WhatsApp-Image-2020-09-11-at-2.42.13-PM-300x200.jpeg",
  "https://keilchainsaw.com/wp-content/uploads/2020/04/IMG_6520-300x300.jpg",
  "https://keilchainsaw.com/wp-content/uploads/2022/03/IMG_9933-300x194.jpg",
];
const TOTAL_SHOWCASE_IMAGES = [
  "https://d2j6dbq0eux0bg.cloudfront.net/images/62425538/2500954597.jpg",
  "https://d2j6dbq0eux0bg.cloudfront.net/images/62425538/products/457848841/3018138312.jpg",
  "https://d2j6dbq0eux0bg.cloudfront.net/images/62425538/5135848889.jpg",
  "https://d2j6dbq0eux0bg.cloudfront.net/images/62425538/5501834060.png",
  "https://d2j6dbq0eux0bg.cloudfront.net/images/62425538/2496789736.jpg",
  "https://d2j6dbq0eux0bg.cloudfront.net/images/62425538/5499090680.png",
  "https://d2j6dbq0eux0bg.cloudfront.net/images/62425538/5427475901.png",
  "https://d2j6dbq0eux0bg.cloudfront.net/images/62425538/2496843626.jpg",
  "https://d2j6dbq0eux0bg.cloudfront.net/images/62425538/5427475991.png",
  "https://d2j6dbq0eux0bg.cloudfront.net/images/62425538/products/381370146/5672598613.png",
  "https://d2j6dbq0eux0bg.cloudfront.net/images/62425538/2496904787.jpg",
  "https://d2j6dbq0eux0bg.cloudfront.net/images/62425538/2494119666.jpg",
  "https://d2j6dbq0eux0bg.cloudfront.net/images/62425538/products/653421513/5529822373.png",
  "https://d2j6dbq0eux0bg.cloudfront.net/images/62425538/products/828840470/5701897630.jpg",
  "https://d2j6dbq0eux0bg.cloudfront.net/images/62425538/products/462560015/5500592069.png",
  "https://d2j6dbq0eux0bg.cloudfront.net/images/62425538/5411304746.png",
  "https://d2j6dbq0eux0bg.cloudfront.net/images/62425538/2898166049.jpg",
  "https://d2j6dbq0eux0bg.cloudfront.net/images/62425538/5499696485.png",
  "https://d2j6dbq0eux0bg.cloudfront.net/images/62425538/products/381369965/6151905484.webp",
  "https://d2j6dbq0eux0bg.cloudfront.net/images/62425538/products/381370188/5038576633.jpg",
];
const DCA_SHOWCASE_IMAGES = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNArXjtsvbHwPi9fche-Y2uKGk1IetEWtDVhBCxQXPyA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_umzqyQ0RduNfEScoVu3Jq4FlNknSNHTmkM3ZZ1prTw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgU__XH4BKb5Re1QUii7P6xStiNH_bj26m3_-Pt1XhTQ&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSPyTnSKWyf5jxpJCxO4CZk_Q8_jedp53e99GnfiFQaA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMWd59SPO5k7pZQN7sSYGSlO1z1tqmygcFSc7w1CfBA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxZ-RSLy7TDVkgKlYfHSSq2QGvHnmc_joc4goYEXLGkg&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhVV2fXdIVoW2tjH8Enr4releLX8l0VTAobePJMwALug&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTraks-u87-LZICQPpEMrOhJc9CH9QZwQYZd8GnamH9Zg&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Iw5LNFN0W2h2sz9IdDqtz0spTer_a22LVV7annzAsw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQogsI9GppkF10XnwLSL9gjh5ySqpPgKyyHqTAEsvPifQ&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_Kfe63xBsXqagv_gYbr-az8lvrzU5q5BAbwvovkHK-A&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhbn4prkZspO6fbEK-HKBi9iQeZp1ctkYrF5t9ge0UhA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBAqB-FRo_A8Ik__CtKDMY6RQwD3-OZ-WUKo9UE4gleQ&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSW8qYvqueGXVc5qXxg-7Hf3zi-A5rju5c2wOvHE9Uug&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkd2DPucgWa9ndp08cF_jx3-63FxXUY1HRyK6eH2F2NA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMr8_VjVNU7XSQ37TX_3nw5aeFqa51PMoCOyKDVxABJA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0fww0iVglak3cHzu0mtg3oFIC293bjyoWzNECopPOow&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqAETh6RPjR6gJs_TC_L3xCVUQEdtnIn8TodjSafV6ng&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmwaki9NK-QcKfolGHzxQCdOU3uaKtsFgyJoesNg4yOw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQf2QCzSTTtzZIryPc7IvZEOBsMsp3oB9SX84Ex0gq9Q&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJtfkM7u3MvRcDPO3HygI-eM2ZjJOSvSnGyTKaCc2-F4p7eHeYPjqauYxg70vgL1bm0rVzefyXsgXRkl37r2dM35IXRyI2QKXODTG97Fy2Gi95jdZNt4wKBQ&s=10",
];
const HITACHI_SHOWCASE_IMAGES = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNArXjtsvbHwPi9fche-Y2uKGk1IetEWtDVhBCxQXPyA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_umzqyQ0RduNfEScoVu3Jq4FlNknSNHTmkM3ZZ1prTw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgU__XH4BKb5Re1QUii7P6xStiNH_bj26m3_-Pt1XhTQ&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSPyTnSKWyf5jxpJCxO4CZk_Q8_jedp53e99GnfiFQaA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMWd59SPO5k7pZQN7sSYGSlO1z1tqmygcFSc7w1CfBA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxZ-RSLy7TDVkgKlYfHSSq2QGvHnmc_joc4goYEXLGkg&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhVV2fXdIVoW2tjH8Enr4releLX8l0VTAobePJMwALug&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTraks-u87-LZICQPpEMrOhJc9CH9QZwQYZd8GnamH9Zg&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Iw5LNFN0W2h2sz9IdDqtz0spTer_a22LVV7annzAsw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQogsI9GppkF10XnwLSL9gjh5ySqpPgKyyHqTAEsvPifQ&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_Kfe63xBsXqagv_gYbr-az8lvrzU5q5BAbwvovkHK-A&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhbn4prkZspO6fbEK-HKBi9iQeZp1ctkYrF5t9ge0UhA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBAqB-FRo_A8Ik__CtKDMY6RQwD3-OZ-WUKo9UE4gleQ&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSW8qYvqueGXVc5qXxg-7Hf3zi-A5rju5c2wOvHE9Uug&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkd2DPucgWa9ndp08cF_jx3-63FxXUY1HRyK6eH2F2NA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMr8_VjVNU7XSQ37TX_3nw5aeFqa51PMoCOyKDVxABJA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0fww0iVglak3cHzu0mtg3oFIC293bjyoWzNECopPOow&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqAETh6RPjR6gJs_TC_L3xCVUQEdtnIn8TodjSafV6ng&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmwaki9NK-QcKfolGHzxQCdOU3uaKtsFgyJoesNg4yOw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQf2QCzSTTtzZIryPc7IvZEOBsMsp3oB9SX84Ex0gq9Q&s=10",
];
const KPT_SHOWCASE_IMAGES = [
  "https://storage.googleapis.com/kpt-web.appspot.com/products/634edfb9-d1f8-43f3-b798-8ec373699a1c.PNG",
  "https://storage.googleapis.com/kpt-web.appspot.com/products/99c10433-2ccc-47e5-ac65-e86265e36bef.webp",
  "https://storage.googleapis.com/kpt-web.appspot.com/products/28085e83-8b1b-4222-afd9-be2d6f73a69b.webp",
  "https://storage.googleapis.com/kpt-web.appspot.com/products/b6240b94-a02b-4a39-b43a-e001240a8ba0.webp",
  "https://storage.googleapis.com/kpt-web.appspot.com/products/cfd73090-fd6c-4f5e-bf1f-5d096386757e.PNG",
  "https://storage.googleapis.com/kpt-web.appspot.com/products/422a5891-fbbf-42c7-882c-b45d64ea78f0.png",
  "https://storage.googleapis.com/kpt-web.appspot.com/products/ed976d4e-9ad9-4422-9695-de4d3c524f95.png",
  "https://storage.googleapis.com/kpt-web.appspot.com/products/5cb90981-fcd0-456c-9273-6d537ae8916d.PNG",
  "https://storage.googleapis.com/kpt-web.appspot.com/products/5861f073-6442-4b82-aa1b-081838ad1334.png",
  "https://storage.googleapis.com/kpt-web.appspot.com/products/7e99e6a5-a8a2-409e-8c66-99f073b651cc.webp",
  "https://storage.googleapis.com/kpt-web.appspot.com/products/4a1b89d8-0373-4fc9-93c0-542a944922c6.webp",
  "https://storage.googleapis.com/kpt-web.appspot.com/products/532f2050-24bb-40f9-b435-76da8e108102.webp",
  "https://storage.googleapis.com/kpt-web.appspot.com/products/994f403f-7dee-4fab-9b18-28f43b61ac0e.png",
  "https://storage.googleapis.com/kpt-web.appspot.com/products/a6808d2f-be7e-42ac-9dbc-810684af9b37.png",
  "https://storage.googleapis.com/kpt-web.appspot.com/products/e560d79c-2d72-415b-b01c-2513a07f3eb6.webp",
  "https://storage.googleapis.com/kpt-web.appspot.com/products/bce00256-a6d2-4df5-b30e-76611b67395e.PNG",
  "https://storage.googleapis.com/kpt-web.appspot.com/products/38684c4f-fa19-463c-8e14-92757ccdd836.webp",
];
const STANLEY_SHOWCASE_IMAGES = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNArXjtsvbHwPi9fche-Y2uKGk1IetEWtDVhBCxQXPyA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_umzqyQ0RduNfEScoVu3Jq4FlNknSNHTmkM3ZZ1prTw&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgU__XH4BKb5Re1QUii7P6xStiNH_bj26m3_-Pt1XhTQ&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSPyTnSKWyf5jxpJCxO4CZk_Q8_jedp53e99GnfiFQaA&s=10",
];
const DONGCHENG_SHOWCASE_IMAGES = [
  "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSbQ0BnwV58wMfDPbWTBv_O1cJtX022evav10SVHMlWC4sx-AiHOV80iItR7VVY0lSsFlaQVufTWX3dyiwMJ9PO3hNq3izaaVLaUlNW9P-jsO_nHVbpB4qi",
  "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRViWjWLO_5E66Y-LYFVZ859tEI6K1V7qQE-S-KMFbxFqlLhpaSN6aYw-ONynuXzVMFIAarfrGDAq2ViINBnw_dv4eIlJ-IkW6n_-eX9QQvNbcjxRky2bO5",
  "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTigTqDif22E45wH-q0irmM1lH3e3HytMmPCEcLEWgJR8SsZMvilgtCFaZku4dT3Pm0bOYAs5Bsmlhg9etVguYy2VUXDtrjR9oiblAuGO_CUyKceIAzic76cg",
  "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRADsTShjWDbOUeksWCynS7B3r9G4X8APQemAJHYfzMZhlOZdGqNX9LaqXgJ3dTCbzfFhekG0fVv5TrNCiTDnNfgq4gsKZuWDR1NS_oYy8x75z-6AdgRPtxQQ",
  "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR4Bailw6Qxs4sn05Gl2Jm3NfxIOwigHaZRBekZGABJLzAE4FimlpMBqqJVfMzIWQvbVmq9FgAcu9HM-Hz8bwDYg0qAS9d-AnqhyLem1-8lqn3InOe3zE1Mbw",
];
const RALLIWOLF_SHOWCASE_IMAGES = [
  "https://ralliwolf.com/wp-content/uploads/2025/10/RMS-255-n-300x300.png",
  "https://ralliwolf.com/wp-content/uploads/2026/02/RC50-01-300x300.jpg",
  "https://ralliwolf.com/wp-content/uploads/2025/05/rvc12l-new-300x300.png",
  "https://ralliwolf.com/wp-content/uploads/2025/05/RWC-133-300x300.jpg",
  "https://ralliwolf.com/wp-content/uploads/2026/02/red10-01-300x300.jpg",
  "https://ralliwolf.com/wp-content/uploads/2025/08/rw11h-300x300.png",
  "https://ralliwolf.com/wp-content/uploads/2026/01/RG9-100-300x293.png",
  "https://ralliwolf.com/wp-content/uploads/2024/05/RC14D-300x300.jpg",
  "https://ralliwolf.com/wp-content/uploads/2024/05/VSM-180mm-300x300.jpg",
  "https://ralliwolf.com/wp-content/uploads/2025/05/RB50-S-300x300.png",
  "https://ralliwolf.com/wp-content/uploads/2024/05/RW125N-300x300.jpg",
  "https://ralliwolf.com/wp-content/uploads/2025/05/RP500-300x300.png",
  "https://ralliwolf.com/wp-content/uploads/2025/05/MEGA-50-300x300.jpg",
  "https://ralliwolf.com/wp-content/uploads/2025/11/RHP120-300x300.png",
  "https://ralliwolf.com/wp-content/uploads/2025/05/RDD250-300x300.jpg",
  "https://ralliwolf.com/wp-content/uploads/2024/08/RG2100-300x300.jpg",
  "https://ralliwolf.com/wp-content/uploads/2024/05/drill-stands-300x235.jpg",
];
const YATO_SHOWCASE_IMAGES = [
  "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=800&auto=format&fit=crop&q=80",
];
const MAKITA_SHOWCASE_IMAGES = [
  "https://makita.in/wp-content/uploads/2026/08/ML014G_PR_IMG.jpg",
  "https://makita.in/wp-content/uploads/2026/08/HS014_PR_IMG.jpg",
  "https://makita.in/wp-content/uploads/2026/07/DLM540_Pr_Img.jpg",
  "https://makita.in/wp-content/uploads/2026/07/TD023D_PR_IMG.jpg",
  "https://makita.in/wp-content/uploads/2026/06/VL001G_Pr.jpg",
  "https://makita.in/wp-content/uploads/2026/06/PB003G_Pr_Img.jpg",
  "https://makita.in/wp-content/uploads/2026/06/UG001G_PR_IMG.jpg",
  "https://makita.in/wp-content/uploads/2026/06/BS002G-PR.jpg",
  "https://makita.in/wp-content/uploads/2026/06/UB005G-PR-IMG.jpg",
  "https://makita.in/wp-content/uploads/2026/06/DML819_PR_IMG.jpg",
  "https://makita.in/wp-content/uploads/2026/05/ML013G_PR_IMG.jpg",
  "https://makita.in/wp-content/uploads/2026/05/DBN501_product-image.jpg",
];
const DEWALT_SHOWCASE_IMAGES = [
  "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/DCS587X1_1_1680.webp",
  "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/DCW230B_1_1680.webp",
  "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/DCW211B_1_1680.webp",
  "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/DCK2101QQ1WW1_K1_1680.webp",
  "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/DCBPC1615_1_1680.webp",
  "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/DCPS966B_1_1680.webp",
  "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/DCD801B_1_1680.webp",
  "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/DCF622P2_K1_1680.webp",
  "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/DCS525ST_1_1680.webp",
  "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/DCS359E1_K1_1680.webp",
  "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/DCS359B_1_1680.webp",
  "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/DCS525B_1_1680.webp",
  "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/DCS525STWW1_K1_1680.webp",
  "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/DCF514EB_1_1680.webp",
  "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/DCF520B_1_1680.webp",
  "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/DCF514B_1_1680.webp",
  "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/DCF891QQ1_1_1680.webp",
  "https://assets.dewalt.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/DCN910B_1_1680.webp",
];

const BRAND_SHOWCASE_IMAGES = {
  nch: NCH_SHOWCASE_IMAGES,
  bosch: BOSCH_SHOWCASE_IMAGES,
  "bsc-power": BSC_POWER_SHOWCASE_IMAGES,
  akari: AKARI_SHOWCASE_IMAGES,
  "saw-master": SAW_MASTER_SHOWCASE_IMAGES,
  yuri: YURI_SHOWCASE_IMAGES,
  "gc-power": GC_POWER_SHOWCASE_IMAGES,
  keil: KEIL_SHOWCASE_IMAGES,
  total: TOTAL_SHOWCASE_IMAGES,
  dca: DCA_SHOWCASE_IMAGES,
  hitachi: HITACHI_SHOWCASE_IMAGES,
  kpt: KPT_SHOWCASE_IMAGES,
  stanley: STANLEY_SHOWCASE_IMAGES,
  dongcheng: DONGCHENG_SHOWCASE_IMAGES,
  ralliwolf: RALLIWOLF_SHOWCASE_IMAGES,
  yato: YATO_SHOWCASE_IMAGES,
  makita: MAKITA_SHOWCASE_IMAGES,
  dewalt: DEWALT_SHOWCASE_IMAGES,
};

export default function BrandDetail() {
  const { id } = useParams();
  const selectedBrand =
    BRANDS.find((brand) => brand.id === id) ||
    BRANDS.find((brand) => brand.id === "bosch") ||
    BRANDS[0];

  const [searchBrand, setSearchBrand] = useState("");
  const [filterTab, setFilterTab] = useState("All Brands");
  const [sortBy, setSortBy] = useState("Popularity");
  const [activeTab, setActiveTab] = useState("Power Tools");
  const [wishlist, setWishlist] = useState([]);
  const [addedMap, setAddedMap] = useState({});
  const [searchProduct, setSearchProduct] = useState("");
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [footprintImageIndex, setFootprintImageIndex] = useState(0);
  const productRowRef = useRef(null);

  const filteredBrands = BRANDS.filter((b) => {
    const matchesSearch =
      !searchBrand || b.name.toLowerCase().includes(searchBrand.toLowerCase());
    if (!matchesSearch) return false;

    switch (filterTab) {
      case "All Brands":
        return true;
      case "Available":
        return b.statusNew !== true;
      default:
        return b.categories?.includes(filterTab);
    }
  });

  const videos = BRAND_VIDEOS.filter(
    (item) => item.brandId === selectedBrand.id,
  );
  const selectedBrandImages =
    BRAND_SHOWCASE_IMAGES[selectedBrand.id] || SHOWCASE_IMAGES.slice(0, 5);
  const fallbackVideos = [
    {
      title: `${selectedBrand.name} Product Showcase`,
      subtitle: `${selectedBrand.tagline || "Professional tools"} in action`,
    },
    {
      title: `${selectedBrand.name} Workshop Tour`,
      subtitle: `Explore ${selectedBrand.name} engineering and service support`,
    },
    {
      title: `${selectedBrand.name} Expert Guide`,
      subtitle: `Usage guidance and trusted solutions from ${selectedBrand.name}`,
    },
  ];
  const showcaseVideos = Array.from(
    { length: 3 },
    (_, index) =>
      videos[index] || {
        ...fallbackVideos[index],
        thumbnail: selectedBrandImages[index % selectedBrandImages.length],
        duration: "4K",
      },
  );
  const currentVideo = showcaseVideos[currentVideoIndex] || showcaseVideos[0];
  const footprintImages = selectedBrandImages.slice(0, 5);
  const rating = BRAND_RATINGS[selectedBrand.id] || {
    score: "4.5",
    reviews: "300+",
    quality: "94%",
    delivery: "92%",
    support: "93%",
  };

  useEffect(() => {
    setCurrentVideoIndex(0);
    setFootprintImageIndex(0);
  }, [id]);

  const changeBrand = (index) => {
    setFootprintImageIndex(
      (index + footprintImages.length) % footprintImages.length,
    );
  };

  const handleAddToCart = (e, prodId) => {
    e.preventDefault();
    e.stopPropagation();
    setAddedMap((prev) => ({ ...prev, [prodId]: true }));
    setTimeout(
      () => setAddedMap((prev) => ({ ...prev, [prodId]: false })),
      1500,
    );
  };

  const productName = (product) => {
    if (selectedBrand.id === "bosch") return product.name;
    return product.name.includes("Bosch")
      ? product.name.replace(/Bosch/g, selectedBrand.name)
      : `${selectedBrand.name} ${product.name}`;
  };

  const featuredProducts = (BOSCH_PRODUCTS[activeTab] || []).filter((prod) => {
    if (!searchProduct) return true;
    const query = searchProduct.toLowerCase();
    return (
      productName(prod).toLowerCase().includes(query) ||
      prod.subtitle?.toLowerCase().includes(query)
    );
  });

  const scrollLeft = () => {
    if (productRowRef.current) {
      productRowRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };
  const scrollRight = () => {
    if (productRowRef.current) {
      productRowRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div style={styles.page}>
      {/* ===== HERO ===== (unchanged) */}
      <div style={styles.hero}>
        <div style={styles.heroBg}>
          <div style={styles.heroMapDots}>
            {Array.from({ length: 60 }).map((_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: i % 7 === 0 ? "6px" : "3px",
                  height: i % 7 === 0 ? "6px" : "3px",
                  borderRadius: "50%",
                  background:
                    i % 7 === 0 ? "#dc2626" : "rgba(255,255,255,0.15)",
                  left: `${(i * 37) % 100}%`,
                  top: `${(i * 23 + 10) % 100}%`,
                }}
              />
            ))}
          </div>
        </div>
        <div style={styles.heroInner}>
          <div style={styles.heroLeft}>
            <div style={styles.heroOurPartners}>OUR GLOBAL PARTNERS</div>
            <h1 style={styles.heroTitle}>
              TRUSTED BY
              <br />
              <span style={{ color: "#dc2626" }}>INDUSTRY LEADERS</span>
            </h1>
            <p style={styles.heroSubtitle}>
              We collaborate with world-class brands to bring you the finest
              power tools, accessories, and industrial solutions.
            </p>
            <div style={styles.heroStats}>
              {[
                { val: "18+", label: "Global Brands" },
                { val: "5000+", label: "Products Available" },
                { val: "15+", label: "Years of Trust" },
                { val: "100%", label: "Genuine Products" },
                { val: "24x7", label: "Expert Support" },
              ].map((stat, i) => (
                <div key={i} style={styles.heroStat}>
                  <div style={styles.heroStatVal}>{stat.val}</div>
                  <div style={styles.heroStatLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
            <div style={styles.heroBadges}>
              {[
                "✅ Authorized Dealer",
                "📄 GST Invoice",
                "🚚 Secure Delivery",
                "↩️ Easy Returns",
              ].map((badge, i) => (
                <span key={i} style={styles.heroBadgeItem}>
                  {badge}
                </span>
              ))}
            </div>
          </div>
          <div style={styles.heroRight}>
            <div style={styles.floatingBrandLogos}>
              {[
                { name: "BOSCH", x: "10%", y: "20%", color: "#dc2626" },
                { name: "Makita", x: "65%", y: "10%", color: "#2563eb" },
                { name: "Ingco", x: "35%", y: "40%", color: "#dc2626" },
                { name: "DeWalt", x: "70%", y: "60%", color: "#f59e0b" },
                { name: "DCA", x: "5%", y: "65%", color: "#475569" },
                {
                  name: "Total Power Tools",
                  x: "60%",
                  y: "78%",
                  color: "#0f172a",
                },
              ].map((logo, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: logo.x,
                    top: logo.y,
                    background: "#1e293b",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    padding: "8px 14px",
                    fontSize: "13px",
                    fontWeight: "900",
                    color: logo.color,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    letterSpacing: "0.5px",
                    zIndex: 2,
                  }}
                >
                  {logo.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={styles.inner}>
        {/* ===== FILTER BAR ===== */}
        <div style={styles.filterBar}>
          <div style={styles.filterSearchWrapper}>
            <Search size={14} color="#94a3b8" style={{ marginRight: "8px" }} />
            <input
              value={searchBrand}
              onChange={(e) => setSearchBrand(e.target.value)}
              placeholder="Search by brand name..."
              style={styles.filterSearchInput}
            />
          </div>
          <div style={styles.filterTabsRow}>
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                style={{
                  ...styles.filterTab,
                  background: filterTab === tab ? "#dc2626" : "#f1f5f9",
                  color: filterTab === tab ? "#ffffff" : "#475569",
                  border: filterTab === tab ? "none" : "1px solid #e2e8f0",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "12px", color: "#64748b" }}>Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={styles.sortSelect}
            >
              {["Popularity", "A-Z", "Z-A", "Newest"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ===== BRANDS GRID ===== */}
        <div style={styles.brandsGrid}>
          {filteredBrands.map((brand) => (
            <Link
              key={brand.id}
              to={`/brand/${brand.id}`}
              style={styles.brandCard}
            >
              {brand.statusNew && <span style={styles.newBadge}>New</span>}
              <div style={styles.brandLogoArea}>
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    style={styles.brandLogoImage}
                  />
                ) : (
                  <span style={styles.brandLogoText}>{brand.name}</span>
                )}
                {brand.tagline && (
                  <span
                    style={{
                      fontSize: "9px",
                      opacity: 0.7,
                      display: "block",
                      marginTop: "4px",
                    }}
                  >
                    {brand.tagline}
                  </span>
                )}
              </div>
              <div style={styles.brandCardFooter}>
                <div style={styles.brandCountry}>
                  <span style={{ marginRight: "4px" }}>
                    {brand.countryFlag}
                  </span>
                  <span style={{ fontSize: "11px", color: "#64748b" }}>
                    {brand.country}
                  </span>
                </div>
                <span style={styles.authorizedBadge}>
                  <CheckCircle2 size={9} style={{ marginRight: "3px" }} />
                  {brand.status}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <button style={styles.viewAllBrandsBtn}>View All Brands →</button>
        </div>

        {/* ===== FEATURED BRAND ===== */}
        <div style={styles.featuredBrandSection}>
          {/* Left: Brand Info */}
          <div style={styles.featuredBrandLeft}>
            <div style={styles.featuredBrandHeader}>
              <div style={styles.featuredBrandLogoBox}>
                {selectedBrand.logo ? (
                  <img
                    src={selectedBrand.logo}
                    alt={selectedBrand.name}
                    style={{
                      width: "36px",
                      height: "36px",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "900",
                      color: "#dc2626",
                    }}
                  >
                    ⊙
                  </span>
                )}
              </div>
              <div>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "900",
                    color: "#0f172a",
                  }}
                >
                  {selectedBrand.name.toUpperCase()}
                </div>
                {selectedBrand.tagline && (
                  <div style={{ fontSize: "11px", color: "#64748b" }}>
                    {selectedBrand.tagline}
                  </div>
                )}
              </div>
            </div>
            <div style={styles.authorizedPartnerTag}>
              <CheckCircle2
                size={12}
                color="#059669"
                style={{ marginRight: "4px" }}
              />
              {selectedBrand.status?.toUpperCase() || "AUTHORIZED PARTNER"}
            </div>
            <p
              style={{
                fontSize: "12px",
                color: "#64748b",
                margin: "12px 0",
                lineHeight: "1.6",
              }}
            >
              {selectedBrand.name} is a trusted brand in power tools and
              accessories, known for quality and performance across trade
              professionals.
            </p>
            <div style={styles.brandInfoGrid}>
              {[
                {
                  label: "Country",
                  val: `${selectedBrand.countryFlag || ""} ${selectedBrand.country || "Global"}`,
                },
                { label: "Established", val: selectedBrand.founded || "N/A" },
                { label: "Products", val: selectedBrand.products || "200+" },
                {
                  label: "Warranty",
                  val: selectedBrand.warranty || "Up to 6 Months",
                },
              ].map((info) => (
                <div key={info.label} style={styles.brandInfoRow}>
                  <span style={styles.brandInfoLabel}>{info.label}</span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#0f172a",
                      fontWeight: "700",
                    }}
                  >
                    {info.val}
                  </span>
                </div>
              ))}
            </div>
            <Link
              to={`/brand/${selectedBrand.id}`}
              style={styles.exploreBrandBtn}
            >
              Explore {selectedBrand.name} Products →
            </Link>
          </div>

          {/* Right: Product Tabs with new card design */}
          <div style={styles.featuredBrandRight}>
            {/* Tabs */}
            <div style={styles.featuredTabs}>
              {Object.keys(BOSCH_PRODUCTS).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    ...styles.featuredTab,
                    borderBottom:
                      activeTab === tab
                        ? "2px solid #dc2626"
                        : "2px solid transparent",
                    color: activeTab === tab ? "#dc2626" : "#64748b",
                    fontWeight: activeTab === tab ? "800" : "600",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div style={styles.productSearchBar}>
              <Search
                size={14}
                color="#94a3b8"
                style={{ marginRight: "10px" }}
              />
              <input
                value={searchProduct}
                onChange={(e) => setSearchProduct(e.target.value)}
                placeholder={`Search ${selectedBrand.name} products...`}
                style={styles.productSearchInput}
              />
            </div>

            {/* Products Row with scroll buttons */}
            <div style={{ position: "relative" }}>
              <button
                onClick={scrollLeft}
                style={styles.scrollBtnLeft}
                aria-label="Scroll left"
              >
                ‹
              </button>
              <div ref={productRowRef} style={styles.featuredProductsRow}>
                {featuredProducts.map((prod, i) => (
                  <Link
                    to={`/product/${prod.id}`}
                    key={i}
                    style={{ textDecoration: "none" }}
                  >
                    <div style={styles.featuredProductCard}>
                      {/* Wishlist heart */}
                      <button
                        style={{
                          position: "absolute",
                          top: "6px",
                          right: "6px",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          zIndex: 2,
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setWishlist((prev) =>
                            prev.includes(`b${i}`)
                              ? prev.filter((w) => w !== `b${i}`)
                              : [...prev, `b${i}`],
                          );
                        }}
                      >
                        <Heart
                          size={13}
                          color={
                            wishlist.includes(`b${i}`) ? "#dc2626" : "#cbd5e1"
                          }
                          fill={wishlist.includes(`b${i}`) ? "#dc2626" : "none"}
                        />
                      </button>

                      <img
                        src={
                          selectedBrandImages[i % selectedBrandImages.length]
                        }
                        alt={`${selectedBrand.name} ${prod.category} product`}
                        style={styles.featuredProductImage}
                        onError={(event) => {
                          event.currentTarget.src = selectedBrandImages[0];
                        }}
                      />

                      <div style={styles.featuredProductContent}>
                        <div style={styles.featuredProductName}>
                          {productName(prod)}
                        </div>
                        {prod.subtitle && (
                          <div style={styles.featuredProductSubtitle}>
                            {prod.subtitle}
                          </div>
                        )}
                        <div style={styles.featuredProductPriceLine}>
                          <span style={styles.featuredProductPrice}>
                            ₹{prod.price.toLocaleString("en-IN")}
                          </span>
                          <button
                            onClick={(e) => handleAddToCart(e, `b${i}`)}
                            style={{
                              ...styles.featuredProductCartBtn,
                              background: addedMap[`b${i}`]
                                ? "#059669"
                                : "#dc2626",
                            }}
                          >
                            <ShoppingCart size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <button
                onClick={scrollRight}
                style={styles.scrollBtnRight}
                aria-label="Scroll right"
              >
                ›
              </button>
            </div>

            {/* Why Choose + Latest Updates */}
            <div style={styles.featuredBottomGrid}>
              <div style={styles.whyChooseBox}>
                <h4
                  style={{
                    fontSize: "13px",
                    fontWeight: "800",
                    color: "#0f172a",
                    marginBottom: "10px",
                  }}
                >
                  Why Choose {selectedBrand.name}?
                </h4>
                {(selectedBrand.whyChoose || selectedBrand.categories || [])
                  .slice(0, 4)
                  .map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "6px",
                        fontSize: "12px",
                        color: "#475569",
                      }}
                    >
                      <CheckCircle2 size={13} color="#059669" />
                      {item}
                    </div>
                  ))}
              </div>
              <div style={styles.latestUpdatesBox}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "10px",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "13px",
                      fontWeight: "800",
                      color: "#0f172a",
                      margin: 0,
                    }}
                  >
                    Latest Updates
                  </h4>
                  <span style={styles.newTag}>New</span>
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    lineHeight: "1.5",
                    marginBottom: "10px",
                  }}
                >
                  {selectedBrand.latestUpdate ||
                    `${selectedBrand.name} continues to expand its product range with premium tools and accessories.`}
                </p>
                <img
                  src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=200"
                  alt={`Latest ${selectedBrand.name}`}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    objectFit: "cover",
                    height: "60px",
                  }}
                />
                <button style={styles.readMoreBtn}>Read More →</button>
              </div>
            </div>
          </div>
        </div>

        {/* ===== VIDEO HIGHLIGHTS ===== */}
        <div style={styles.videoSection}>
          <div style={styles.videoSectionHeader}>
            <div>
              <div style={styles.sectionTitle}>
                {selectedBrand.name} Video Showcase
              </div>
              <div style={styles.sectionSubtitle}>
                Watch product demos, engineering stories and usage guidance for
                the selected brand.
              </div>
            </div>
            {showcaseVideos.length > 1 && (
              <div style={styles.videoNavButtons}>
                <button
                  style={styles.videoNavBtn}
                  type="button"
                  onClick={() =>
                    setCurrentVideoIndex((prev) =>
                      prev > 0 ? prev - 1 : showcaseVideos.length - 1,
                    )
                  }
                >
                  ←
                </button>
                <button
                  style={styles.videoNavBtn}
                  type="button"
                  onClick={() =>
                    setCurrentVideoIndex((prev) =>
                      prev < showcaseVideos.length - 1 ? prev + 1 : 0,
                    )
                  }
                >
                  →
                </button>
              </div>
            )}
          </div>
          {currentVideo ? (
            <div style={styles.videoHighlightCard}>
              <img
                src={currentVideo.thumbnail}
                alt={currentVideo.title}
                style={styles.videoThumbnail}
                onError={(event) => {
                  event.currentTarget.src = selectedBrandImages[0];
                }}
              />
              <div style={styles.videoHighlightMeta}>
                <div style={styles.videoBadge}>{currentVideo.duration}</div>
                <h3 style={styles.videoHighlightTitle}>{currentVideo.title}</h3>
                <p style={styles.videoHighlightDesc}>{currentVideo.subtitle}</p>
              </div>
            </div>
          ) : (
            <div style={styles.noVideoCard}>
              <div style={styles.sectionTitle}>Video coming soon</div>
              <div style={styles.sectionSubtitle}>
                We are preparing a detailed video experience for{" "}
                {selectedBrand.name}.
              </div>
            </div>
          )}
          <div style={styles.videoCardsRow}>
            {showcaseVideos.map((video, idx) => (
              <div
                key={video.title}
                style={
                  idx === currentVideoIndex
                    ? styles.videoCardActive
                    : styles.videoCard
                }
                onClick={() => setCurrentVideoIndex(idx)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  style={styles.videoCardThumb}
                  onError={(event) => {
                    event.currentTarget.src =
                      selectedBrandImages[idx % selectedBrandImages.length];
                  }}
                />
                <div style={styles.videoCardInfo}>
                  <div style={styles.videoCardTitle}>{video.title}</div>
                  <div style={styles.videoCardSubtitle}>{video.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== TRUST FOOTER ===== */}
        <div style={styles.trustFooter}>
          {[
            {
              icon: "✅",
              title: "100% Original Products",
              desc: "Genuine & Authorised Parts",
            },
            {
              icon: "🚚",
              title: "Fast & Safe Delivery",
              desc: "Pan India Fast Shipping",
            },
            {
              icon: "🛡️",
              title: "Warranty Assurance",
              desc: "Brand Warranty Upto 6 Months",
            },
            {
              icon: "📦",
              title: "Bulk Order Support",
              desc: "Best Prices for Bulk Buyers",
            },
            {
              icon: "📄",
              title: "GST Invoice Available",
              desc: "Complete Billing & Invoice",
            },
            {
              icon: "🎧",
              title: "Expert Support",
              desc: "24x7 Technical Assistance",
            },
          ].map((badge, i) => (
            <div key={i} style={styles.trustBadge}>
              <span style={{ fontSize: "24px", marginBottom: "8px" }}>
                {badge.icon}
              </span>
              <div style={styles.trustBadgeTitle}>{badge.title}</div>
              <div style={styles.trustBadgeDesc}>{badge.desc}</div>
            </div>
          ))}
        </div>

        {/* ===== GLOBAL FOOTPRINT ===== */}
        <div style={styles.mapRatingsSection}>
          <div style={styles.mapPanel}>
            <h3 style={styles.sectionTitle}>Global Brand Footprint</h3>
            <p style={styles.sectionSubtitle}>
              Visualize the reach of our trusted brands across major regions
              with verified delivery and service locations.
            </p>
            <img
              src={footprintImages[footprintImageIndex]}
              alt={`${selectedBrand.name} global footprint`}
              style={styles.mapImage}
              onError={(event) => {
                event.currentTarget.src = selectedBrandImages[0];
              }}
            />
            <div style={styles.mapCarouselControls}>
              <button
                type="button"
                style={styles.mapCarouselButton}
                onClick={() => changeBrand(footprintImageIndex - 1)}
                aria-label="Previous footprint image"
              >
                ←
              </button>
              <div style={styles.mapThumbnails}>
                {footprintImages.map((image, index) => (
                  <button
                    type="button"
                    key={`${image}-${index}`}
                    onClick={() => changeBrand(index)}
                    aria-label={`View footprint image ${index + 1}`}
                    style={{
                      ...styles.mapThumbnailButton,
                      borderColor:
                        index === footprintImageIndex ? "#dc2626" : "#e2e8f0",
                    }}
                  >
                    <img
                      src={image}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </button>
                ))}
              </div>
              <button
                type="button"
                style={styles.mapCarouselButton}
                onClick={() => changeBrand(footprintImageIndex + 1)}
                aria-label="Next footprint image"
              >
                →
              </button>
            </div>
            <div style={styles.mapStatsRow}>
              {[
                { label: "Country", value: selectedBrand.country || "Global" },
                {
                  label: "Categories",
                  value: selectedBrand.categories?.length || 0,
                },
                { label: "Products", value: selectedBrand.products || "200+" },
              ].map((item) => (
                <div key={item.label} style={styles.mapStatCard}>
                  <div style={styles.mapStatValue}>{item.value}</div>
                  <div style={styles.mapStatLabel}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={styles.ratingPanel}>
            <div style={styles.sectionTitle}>Customer Satisfaction</div>
            <div style={styles.ratingSummary}>
              <span style={styles.ratingValue}>{rating.score}</span>
              <span style={styles.ratingOutOf}>/5</span>
            </div>
            <div style={styles.ratingMeta}>
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} style={styles.ratingStar}>
                  ★
                </span>
              ))}
              <span style={styles.ratingCount}>({rating.reviews} reviews)</span>
            </div>
            <div style={styles.ratingDetails}>
              <div style={styles.ratingDetailRow}>
                <span>Verified Product Quality</span>
                <strong>{rating.quality}</strong>
              </div>
              <div style={styles.ratingDetailRow}>
                <span>Delivery Satisfaction</span>
                <strong>{rating.delivery}</strong>
              </div>
              <div style={styles.ratingDetailRow}>
                <span>Support Experience</span>
                <strong>{rating.support}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* ===== PARTNER CTA ===== */}
        <div style={styles.partnerCtaSection}>
          <div style={styles.partnerCtaLeft}>
            <img
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&auto=format&fit=crop"
              alt="Partnership"
              style={styles.partnerCtaImg}
            />
            <div style={{ flex: 1 }}>
              <h2 style={styles.partnerCtaTitle}>
                Want to Partner With Global Brands?
              </h2>
              <p style={styles.partnerCtaSubtitle}>
                Become our authorized dealer and get exclusive access to global
                brands with special pricing & support.
              </p>
              <div style={styles.partnerBenefits}>
                {[
                  "Exclusive Pricing",
                  "Marketing Support",
                  "Priority Service",
                  "Business Growth",
                ].map((b, i) => (
                  <div key={i} style={styles.partnerBenefit}>
                    <CheckCircle2
                      size={12}
                      color="#059669"
                      style={{ marginRight: "5px" }}
                    />
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={styles.partnerCtaRight}>
            <Link to="/contact" style={styles.dealershipBtn}>
              Apply for Dealership →
            </Link>
            <div style={styles.talkExpertRow}>
              <Phone size={14} color="#94a3b8" style={{ marginRight: "6px" }} />
              <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                Talk to our expert:{" "}
              </span>
              <a
                href="tel:+919754015503"
                style={{
                  fontSize: "13px",
                  fontWeight: "800",
                  color: "#ffffff",
                  textDecoration: "none",
                  marginLeft: "4px",
                }}
              >
                +91 97540 15503
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== STYLES ====================
const styles = {
  // ... (all previous styles remain the same, except we update featuredProductCard and related)
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    paddingTop: "72px",
    fontFamily: "'Inter', sans-serif",
  },
  hero: {
    background:
      "linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #1a0a0a 100%)",
    position: "relative",
    overflow: "hidden",
    minHeight: "320px",
  },
  heroBg: { position: "absolute", inset: 0 },
  heroMapDots: { position: "absolute", inset: 0 },
  heroInner: {
    maxWidth: "1240px",
    margin: "0 auto",
    padding: "40px 20px",
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: "40px",
    alignItems: "center",
    position: "relative",
    zIndex: 2,
  },
  heroLeft: {},
  heroOurPartners: {
    fontSize: "10px",
    fontWeight: "800",
    color: "#94a3b8",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "12px",
  },
  heroTitle: {
    fontSize: "40px",
    fontWeight: "900",
    color: "#ffffff",
    lineHeight: "1.15",
    margin: "0 0 16px",
  },
  heroSubtitle: {
    fontSize: "13px",
    color: "#94a3b8",
    margin: "0 0 24px",
    lineHeight: "1.6",
    maxWidth: "420px",
  },
  heroStats: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  heroStat: { textAlign: "center" },
  heroStatVal: {
    fontSize: "20px",
    fontWeight: "900",
    color: "#ffffff",
    lineHeight: "1.1",
  },
  heroStatLabel: {
    fontSize: "9px",
    color: "#64748b",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  heroBadges: { display: "flex", gap: "12px", flexWrap: "wrap" },
  heroBadgeItem: { fontSize: "11px", color: "#94a3b8", fontWeight: "600" },
  heroRight: { position: "relative", height: "240px" },
  floatingBrandLogos: { position: "relative", width: "100%", height: "100%" },
  inner: {
    maxWidth: "1240px",
    margin: "0 auto",
    padding: "32px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },
  filterBar: {
    background: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    padding: "14px 16px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },
  filterSearchWrapper: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "8px 12px",
    minWidth: "200px",
  },
  filterSearchInput: {
    border: "none",
    outline: "none",
    fontSize: "12px",
    flex: 1,
    background: "transparent",
  },
  filterTabsRow: { display: "flex", gap: "6px", flex: 1, flexWrap: "wrap" },
  filterTab: {
    padding: "7px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.15s",
  },
  sortSelect: {
    padding: "6px 12px",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    fontSize: "12px",
    outline: "none",
    background: "#fff",
  },
  productSearchBar: {
    marginTop: "12px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "10px 14px",
    background: "#ffffff",
  },
  productSearchInput: {
    border: "none",
    outline: "none",
    fontSize: "12px",
    color: "#0f172a",
    width: "100%",
    background: "transparent",
  },
  brandsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "14px",
  },
  brandCard: {
    background: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    textDecoration: "none",
    position: "relative",
    cursor: "pointer",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    transition: "box-shadow 0.2s",
    ":hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.08)" },
  },
  newBadge: {
    position: "absolute",
    top: "6px",
    right: "6px",
    background: "#059669",
    color: "#ffffff",
    fontSize: "8px",
    fontWeight: "800",
    padding: "2px 6px",
    borderRadius: "10px",
    zIndex: 1,
  },
  brandLogoArea: {
    height: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    textAlign: "center",
    background: "#ffffff",
  },
  brandLogoImage: { maxWidth: "80%", maxHeight: "60px", objectFit: "contain" },
  brandLogoText: {
    fontSize: "14px",
    fontWeight: "900",
    letterSpacing: "0.5px",
    color: "#0f172a",
  },
  brandCardFooter: {
    padding: "8px 10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #f1f5f9",
  },
  brandCountry: { display: "flex", alignItems: "center" },
  authorizedBadge: {
    display: "flex",
    alignItems: "center",
    background: "#ecfdf5",
    color: "#059669",
    fontSize: "8px",
    fontWeight: "800",
    padding: "2px 6px",
    borderRadius: "10px",
  },
  viewAllBrandsBtn: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    color: "#0f172a",
    padding: "12px 32px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
  },
  featuredBrandSection: {
    background: "#0f172a",
    borderRadius: "16px",
    border: "1px solid #1e293b",
    display: "grid",
    gridTemplateColumns: "260px 1fr",
    overflow: "hidden",
  },
  featuredBrandLeft: { padding: "28px", borderRight: "1px solid #1e293b" },
  featuredBrandHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
  },
  featuredBrandLogoBox: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "#1e293b",
    border: "1px solid #334155",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  authorizedPartnerTag: {
    display: "inline-flex",
    alignItems: "center",
    background: "#022c22",
    color: "#34d399",
    fontSize: "10px",
    fontWeight: "700",
    padding: "4px 10px",
    borderRadius: "20px",
    border: "1px solid #064e3b",
  },
  brandInfoGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "20px",
  },
  brandInfoRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    paddingBottom: "6px",
    borderBottom: "1px solid #1e293b",
  },
  brandInfoLabel: { color: "#64748b", fontWeight: "500" },
  exploreBrandBtn: {
    display: "block",
    background: "#dc2626",
    color: "#ffffff",
    textDecoration: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "700",
    textAlign: "center",
  },
  featuredBrandRight: { padding: "20px 24px" },
  featuredTabs: {
    display: "flex",
    gap: "0",
    borderBottom: "1px solid #1e293b",
    marginBottom: "16px",
  },
  featuredTab: {
    padding: "10px 16px",
    background: "none",
    border: "none",
    fontSize: "12px",
    cursor: "pointer",
    transition: "all 0.15s",
    whiteSpace: "nowrap",
  },
  scrollBtnLeft: {
    position: "absolute",
    left: "-12px",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    color: "#ffffff",
    fontSize: "24px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    opacity: 0.8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    transition: "all 0.2s",
    ":hover": { background: "#334155", opacity: 1 },
  },
  scrollBtnRight: {
    position: "absolute",
    right: "-12px",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    color: "#ffffff",
    fontSize: "24px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    opacity: 0.8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    transition: "all 0.2s",
    ":hover": { background: "#334155", opacity: 1 },
  },
  featuredProductsRow: {
    display: "flex",
    gap: "16px",
    overflowX: "auto",
    padding: "12px 4px",
    marginBottom: "16px",
    scrollbarWidth: "thin",
    scrollbarColor: "#334155 #1e293b",
  },
  featuredProductCard: {
    background: "#1e293b",
    borderRadius: "10px",
    border: "1px solid #334155",
    padding: "14px",
    minWidth: "160px",
    position: "relative",
    flexShrink: 0,
    transition: "transform 0.2s, box-shadow 0.2s",
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
    },
  },
  featuredProductContent: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  featuredProductImage: {
    width: "100%",
    height: "96px",
    objectFit: "cover",
    borderRadius: "6px",
    marginBottom: "10px",
    background: "#334155",
  },
  featuredProductName: {
    fontSize: "12px",
    fontWeight: "800",
    color: "#ffffff",
    lineHeight: "1.3",
  },
  featuredProductSubtitle: {
    fontSize: "10px",
    fontWeight: "500",
    color: "#94a3b8",
    marginBottom: "6px",
  },
  featuredProductPriceLine: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "6px",
  },
  featuredProductPrice: {
    fontSize: "14px",
    fontWeight: "900",
    color: "#f87171",
  },
  featuredProductCartBtn: {
    width: "28px",
    height: "28px",
    border: "none",
    borderRadius: "6px",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  featuredBottomGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  videoSection: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    border: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  videoSectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "900",
    color: "#0f172a",
  },
  sectionSubtitle: {
    fontSize: "12px",
    color: "#64748b",
    marginTop: "6px",
    maxWidth: "640px",
    lineHeight: "1.6",
  },
  videoNavButtons: { display: "flex", gap: "8px" },
  videoNavBtn: {
    background: "#0f172a",
    border: "none",
    color: "#ffffff",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "700",
  },
  videoHighlightCard: {
    display: "grid",
    gridTemplateColumns: "320px 1fr",
    gap: "20px",
    alignItems: "center",
    background: "#f8fafc",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
  },
  videoThumbnail: {
    width: "100%",
    height: "240px",
    objectFit: "cover",
  },
  videoHighlightMeta: { padding: "20px" },
  videoBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "#dc2626",
    color: "#ffffff",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "10px",
    fontWeight: "700",
    marginBottom: "12px",
  },
  videoHighlightTitle: {
    fontSize: "18px",
    fontWeight: "900",
    color: "#0f172a",
    marginBottom: "10px",
  },
  videoHighlightDesc: {
    fontSize: "12px",
    color: "#475569",
    lineHeight: "1.6",
  },
  noVideoCard: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "36px",
    background: "#f8fafc",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
  },
  videoCardsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
  },
  videoCard: {
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    cursor: "pointer",
    background: "#ffffff",
  },
  videoCardActive: {
    borderRadius: "14px",
    border: "2px solid #dc2626",
    overflow: "hidden",
    cursor: "pointer",
    background: "#ffffff",
  },
  videoCardThumb: { width: "100%", height: "140px", objectFit: "cover" },
  videoCardInfo: { padding: "12px" },
  videoCardTitle: {
    fontSize: "13px",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "6px",
  },
  videoCardSubtitle: { fontSize: "11px", color: "#64748b", lineHeight: "1.5" },
  mapRatingsSection: {
    display: "grid",
    gridTemplateColumns: "1.6fr 1fr",
    gap: "20px",
    alignItems: "stretch",
  },
  mapPanel: {
    background: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  mapImage: {
    width: "100%",
    borderRadius: "16px",
    objectFit: "cover",
    minHeight: "220px",
  },
  mapCarouselControls: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  mapThumbnails: {
    display: "flex",
    gap: "8px",
    overflowX: "auto",
    flex: 1,
    padding: "2px",
  },
  mapThumbnailButton: {
    width: "76px",
    height: "52px",
    padding: 0,
    flexShrink: 0,
    overflow: "hidden",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    background: "#ffffff",
    cursor: "pointer",
  },
  mapCarouselButton: {
    width: "34px",
    height: "34px",
    flexShrink: 0,
    border: "1px solid #cbd5e1",
    borderRadius: "50%",
    background: "#ffffff",
    color: "#0f172a",
    cursor: "pointer",
    fontSize: "16px",
  },
  mapStatsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "12px",
  },
  mapStatCard: {
    background: "#f8fafc",
    borderRadius: "14px",
    padding: "14px",
    textAlign: "center",
  },
  mapStatValue: {
    fontSize: "18px",
    fontWeight: "900",
    color: "#0f172a",
  },
  mapStatLabel: {
    fontSize: "11px",
    color: "#64748b",
    marginTop: "4px",
  },
  ratingPanel: {
    background: "#0f172a",
    borderRadius: "16px",
    padding: "24px",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  ratingSummary: {
    display: "flex",
    alignItems: "flex-end",
    gap: "8px",
  },
  ratingValue: {
    fontSize: "44px",
    fontWeight: "900",
    lineHeight: "1",
  },
  ratingOutOf: { fontSize: "18px", color: "#94a3b8" },
  ratingMeta: { display: "flex", alignItems: "center", gap: "10px" },
  ratingStar: { color: "#facc15", fontSize: "16px" },
  ratingCount: { fontSize: "12px", color: "#94a3b8" },
  ratingDetails: { display: "grid", gap: "12px" },
  ratingDetailRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    color: "#cbd5e1",
  },
  whyChooseBox: {
    background: "#1e293b",
    borderRadius: "10px",
    border: "1px solid #334155",
    padding: "14px",
  },
  latestUpdatesBox: {
    background: "#1e293b",
    borderRadius: "10px",
    border: "1px solid #334155",
    padding: "14px",
  },
  newTag: {
    background: "#059669",
    color: "#ffffff",
    fontSize: "9px",
    fontWeight: "800",
    padding: "2px 7px",
    borderRadius: "10px",
  },
  readMoreBtn: {
    background: "none",
    border: "none",
    color: "#dc2626",
    fontSize: "11px",
    fontWeight: "700",
    cursor: "pointer",
    padding: "6px 0 0",
    display: "block",
  },
  trustFooter: {
    background: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    padding: "24px",
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "16px",
    textAlign: "center",
  },
  trustBadge: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  trustBadgeTitle: {
    fontSize: "12px",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "4px",
  },
  trustBadgeDesc: { fontSize: "10px", color: "#94a3b8" },
  partnerCtaSection: {
    background: "#0f172a",
    borderRadius: "16px",
    padding: "32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "24px",
  },
  partnerCtaLeft: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flex: 1,
  },
  partnerCtaImg: {
    width: "80px",
    height: "80px",
    borderRadius: "12px",
    objectFit: "cover",
    flexShrink: 0,
  },
  partnerCtaTitle: {
    fontSize: "18px",
    fontWeight: "900",
    color: "#ffffff",
    margin: "0 0 8px",
  },
  partnerCtaSubtitle: {
    fontSize: "12px",
    color: "#94a3b8",
    margin: "0 0 12px",
    lineHeight: "1.5",
  },
  partnerBenefits: { display: "flex", flexWrap: "wrap", gap: "12px" },
  partnerBenefit: {
    display: "flex",
    alignItems: "center",
    fontSize: "11px",
    color: "#94a3b8",
    fontWeight: "600",
  },
  partnerCtaRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    flexShrink: 0,
  },
  dealershipBtn: {
    background: "#dc2626",
    color: "#ffffff",
    textDecoration: "none",
    padding: "14px 24px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "800",
    display: "block",
    textAlign: "center",
    whiteSpace: "nowrap",
  },
  talkExpertRow: { display: "flex", alignItems: "center" },
};
 
