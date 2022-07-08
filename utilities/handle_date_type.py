import datetime
import decimal


def handle_date_type(info: list) -> list:
    result = list()
    for i in range(len(info)):
        result_row = list()
        for j in range(len(info[i])):
            if isinstance(info[i][j], datetime.date):

                result_row.append(info[i][j].strftime('%Y-%m-%d'))
            else:
                result_row.append(info[i][j])
        result.append(result_row)

    return result
