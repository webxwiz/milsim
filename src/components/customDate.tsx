export default function convertISOToCustomFormat(isoDate: string | number | Date) {
    const date = new Date(isoDate);
    
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = String(date.getUTCFullYear()).slice(-2);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  
    const customFormat = `${day}/${month}/${year} ${hours}:${minutes} UTC`;
    
    return customFormat;
  }