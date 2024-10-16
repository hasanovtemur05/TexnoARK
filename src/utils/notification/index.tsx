import { notification } from 'antd';

export function Notification(type: 'error' | 'success' | 'info', message: string): void {
    try {
        
        if (type === 'error') {
            notification.error({
                message: 'Error',
                description: message,
            });
        } else if (type === 'success') {
            notification.success({
                message: 'Success',
                description: message,
            });
        } else {
            notification.info({
                message: 'Info',
                description: message,
            });
        }
    } catch (error) {
        console.error('Failed to display notification:', error);
    }
}
