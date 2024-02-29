from whatsminer import WhatsminerAccessToken, WhatsminerAPI
token = WhatsminerAccessToken(ip_address="192.168.2.7")
summary_json = WhatsminerAPI.get_read_only_info(access_token=token,
                                                cmd="summary")

print(summary_json)
