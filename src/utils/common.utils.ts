// 파일 이름을 난수로 생성
export const generateRandomFileName = (originalName: string) => {
    const extension = originalName.split('.').pop();
    const randomString = Math.random().toString(36).substring(2, 15);
    const timestamp = Date.now();
    return `${randomString}_${timestamp}.${extension}`;
};