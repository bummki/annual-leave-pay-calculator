/**
 * 데이터를 CSV 파일로 변환하여 다운로드합니다.
 * @param data CSV로 변환할 객체 배열
 * @param filename 저장될 파일 이름 (확장자 제외)
 */
export function downloadCsv(data: any[], filename: string) {
    if (data.length === 0) return;

    // 헤더 추출
    const headers = Object.keys(data[0]);

    // 행 생성
    const rows = data.map(obj =>
        headers.map(header => {
            const val = obj[header] || "";
            // 쉼표나 줄바꿈이 포함된 경우 따옴표로 감싸기
            const stringified = String(val).replace(/"/g, '""');
            return `"${stringified}"`;
        }).join(",")
    );

    // BOM (한글 깨짐 방지) + 헤더 + 데이터
    const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * HR 관리자용 표준 CSV 템플릿을 다운로드합니다.
 */
export function downloadHrTemplate() {
    const headers = ["성명", "사번", "입사일", "부서명", "월기본급", "월소정근로시간", "기사용연차", "이메일", "퇴직예정일"];
    const exampleData = [
        {
            "성명": "김철수",
            "사번": "2020001",
            "입사일": "2020-01-01",
            "부서명": "기획팀",
            "월기본급": "3000000",
            "월소정근로시간": "209",
            "기사용연차": "10.5",
            "이메일": "kim@company.com",
            "퇴직예정일": ""
        },
        {
            "성명": "이영희",
            "사번": "20230501",
            "입사일": "2023-05-01",
            "부서명": "개발팀",
            "월기본급": "3500000",
            "월소정근로시간": "209",
            "기사용연차": "5",
            "이메일": "lee@company.com",
            "퇴직예정일": ""
        }
    ];
    downloadCsv(exampleData, "연차관리_업로드_양식");
}
