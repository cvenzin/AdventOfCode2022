export class Day20 {
    part1(input: string): number {
        const data: OrderObject[] = [...input.replaceAll('\r', '').split('\n').map(n => ({
            value: Number(n)
        }))];
        const orders = [...data];
        this.mix(orders, data);
        const zeroIndex = data.findIndex(d => d.value === 0);
        return [1000, 2000, 3000].map(d => data[(zeroIndex + d) % data.length].value).reduce((a, b) => a + b);
    }

    part2(input: string): number {
        const decryptionKey = 811589153;
        const data = [...input.replaceAll('\r', '').split('\n').map(n => ({
            value: Number(n) * decryptionKey
        }))];
        const orders = [...data];
        for (let i = 0; i < 10; i++) {
            this.mix(orders, data);
        }

        const zeroIndex = data.findIndex(d => d.value === 0);
        return [1000, 2000, 3000].map(d => data[(zeroIndex + d) % data.length].value).reduce((a, b) => a + b);
    }

    private mix(orders: OrderObject[], data: OrderObject[]): void {
        orders.forEach(orderObj => {
            const value = orderObj.value;
            const orderObjIndex = data.findIndex(d => d === orderObj);
            const dataObj = data[orderObjIndex];
            data.splice(orderObjIndex, 1);
            if (orderObjIndex + value === 0) {
                data.push(dataObj);
            } else {
                data.splice((orderObjIndex + value) % data.length, 0, dataObj);
            }
        });
    }
}

interface OrderObject {
    value: number;
}