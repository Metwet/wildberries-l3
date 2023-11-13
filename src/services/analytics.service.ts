import { EventAnalytics, ProductData } from "types";

class AnalyticsService {

    sendRoute(url: string) {
        const event: EventAnalytics = {
            type: 'route',
            payload: { url },
            timestamp: new Date()
        }
        this._send(event);
    }

    sendViewCard(product: ProductData, secretKey: string) {
        const event: EventAnalytics = {
            type: product.log ? 'viewCardPromo' : 'viewCard',
            payload: { product, secretKey },
            timestamp: new Date(),
        };
        this._send(event);
    }

    sendAddToCard(product: ProductData) {
        const event: EventAnalytics = {
            type: 'addToCard',
            payload: { product },
            timestamp: new Date(),
        };

        this._send(event);
    }

    sendPurchase(orderId: string, totalPrice: number, productIds: string[]) {
        const event: EventAnalytics = {
            type:'purchase',
            payload: {orderId, totalPrice, productIds},
            timestamp: new Date()
        };
        this._send(event);
    }

    private _send(event: EventAnalytics) {
        fetch('/api/sendEvent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        })
        .then(response=>{
            if (response.ok) {
                console.log('Событие успешно отправлено.', event);
            } else {
                console.error('Ошибка N1 при отправке события:', response.status, response.statusText);
            }
        })
        .catch(error => {
            console.error('Ошибка N2 при отправке события:', error);
        });
    }
}

export const analyticsService = new AnalyticsService();