import { View, Text } from 'react-native';
import React from 'react';
import OrderProcessingStatusEnum from '../../util/OrderProcessingStatusEnum';

const OrderProcessing = (props) => {
  const { status } = props;
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {status === OrderProcessingStatusEnum.PROCESSING && (
        <>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>ĐƠN HÀNG ĐANG ĐƯỢC XỬ LÝ</Text>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>VUI LÒNG ĐỢI...</Text>
        </>
      )}
      {status === OrderProcessingStatusEnum.SUCCESSED && (
        <View style={{ alignItems: 'center', marginBottom: 100 }}>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>XIN CHÚC MỪNG</Text>
          <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>
            BẠN ĐÃ ĐẶT HÀNG THÀNH CÔNG
          </Text>
        </View>
      )}
      {status === OrderProcessingStatusEnum.FAILED && (
        <View style={{ alignItems: 'center', marginBottom: 100 }}>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>ĐẶT HÀNG THẤT BẠI</Text>
          <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>
            VUI LÒNG THỬ LẠI SAU
          </Text>
        </View>
      )}
    </View>
  );
};

export default OrderProcessing;
